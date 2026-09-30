import mongoose from 'mongoose';
import { Product } from '../models/Product';
import { Customer } from '../models/Customer';
import { Order, IOrder, OrderStatus, PaymentMode } from '../models/Order';
import { Payment } from '../models/Payment';
import { Setting } from '../models/Setting';
import { generateOrderNumber } from '../models/Counter';

export interface CreateOrderInput {
  customerName: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  address: string;
  city: string;
  state?: string;
  pincode: string;
  orderType: 'PICKUP' | 'DELIVERY';
  preferredDate?: string;
  customerNotes?: string;
  items: {
    productId: string;
    quantity: number;
    // Note: Any price sent by frontend is ignored!
  }[];
}

export class OrderService {
  static async createOrder(input: CreateOrderInput): Promise<IOrder> {
    if (!input.items || input.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    // 1. Fetch settings for delivery fee calculations
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }

    // Validate delivery restriction if pincodes configured
    if (
      input.orderType === 'DELIVERY' &&
      settings.allowedPincodes &&
      settings.allowedPincodes.length > 0 &&
      !settings.allowedPincodes.includes(input.pincode.trim())
    ) {
      throw new Error(
        `Delivery is currently not available for pincode ${input.pincode}. Store pickup is available.`
      );
    }

    // 2. Fetch all products from database using IDs
    const productObjectIds = input.items.map((item) => new mongoose.Types.ObjectId(item.productId));
    const dbProducts = await Product.find({
      _id: { $in: productObjectIds },
      isActive: true,
    });

    if (dbProducts.length !== input.items.length) {
      const foundIds = new Set(dbProducts.map((p) => (p._id as any).toString()));
      const missing = input.items.filter((item) => !foundIds.has(item.productId));
      throw new Error(
        `Some selected products are unavailable or discontinued: ${missing.map((m) => m.productId).join(', ')}`
      );
    }

    const productMap = new Map(dbProducts.map((p) => [(p._id as any).toString(), p]));

    // 3. STRICT BACKEND PRICE CALCULATION
    // Line items with snapshot of current name, pack quantity, and DB price
    let subtotal = 0;
    const orderItems = input.items.map((item) => {
      const dbProduct = productMap.get(item.productId)!;

      if (dbProduct.stockStatus === 'OUT_OF_STOCK') {
        throw new Error(`Product "${dbProduct.name}" is currently out of stock`);
      }

      if (item.quantity < 1) {
        throw new Error(`Invalid quantity for ${dbProduct.name}`);
      }

      const unitPrice = dbProduct.price; // authoritative DB price
      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;

      return {
        productId: dbProduct._id as mongoose.Types.ObjectId,
        productName: dbProduct.name,
        packQuantity: dbProduct.packQuantity,
        unitPrice,
        quantity: item.quantity,
        lineTotal,
        image: dbProduct.image,
      };
    });

    // 4. Calculate delivery fee
    let deliveryFee = 0;
    if (input.orderType === 'DELIVERY') {
      if (subtotal < settings.freeDeliveryThreshold) {
        deliveryFee = settings.deliveryFee;
      }
    }

    const totalAmount = subtotal + deliveryFee;

    // Minimum order check
    if (subtotal < (settings.minimumOrderAmount || 0)) {
      throw new Error(
        `Minimum order subtotal requirement is ₹${settings.minimumOrderAmount}. Current subtotal is ₹${subtotal}.`
      );
    }

    // 5. Generate unique atomic sequential order number
    const orderNumber = await generateOrderNumber();

    // 6. Create or update customer
    let customer = await Customer.findOne({ mobile: input.mobile.trim() });
    if (!customer) {
      customer = await Customer.create({
        name: input.customerName.trim(),
        mobile: input.mobile.trim(),
        whatsapp: input.whatsapp?.trim() || input.mobile.trim(),
        email: input.email?.trim().toLowerCase() || '',
        address: input.address.trim(),
        city: input.city.trim(),
        state: input.state?.trim() || 'Tamil Nadu',
        pincode: input.pincode.trim(),
        totalOrders: 1,
        totalSpent: totalAmount,
      });
    } else {
      customer.name = input.customerName.trim();
      if (input.whatsapp) customer.whatsapp = input.whatsapp.trim();
      if (input.email) customer.email = input.email.trim().toLowerCase();
      customer.address = input.address.trim();
      customer.city = input.city.trim();
      customer.state = input.state?.trim() || customer.state;
      customer.pincode = input.pincode.trim();
      customer.totalOrders += 1;
      customer.totalSpent += totalAmount;
      await customer.save();
    }

    // 7. Save Order
    const order = new Order({
      orderNumber,
      customerId: customer._id,
      customerSnapshot: {
        name: customer.name,
        mobile: customer.mobile,
        whatsapp: customer.whatsapp || customer.mobile,
        email: customer.email || '',
      },
      items: orderItems,
      subtotal,
      deliveryFee,
      totalAmount,
      orderType: input.orderType,
      deliveryAddress: {
        address: input.address.trim(),
        city: input.city.trim(),
        state: input.state?.trim() || 'Tamil Nadu',
        pincode: input.pincode.trim(),
      },
      preferredDate: input.preferredDate?.trim() || '',
      paymentStatus: 'PENDING',
      paymentMode: 'CASH', // Default offline mode until confirmed
      orderStatus: 'PENDING',
      customerNotes: input.customerNotes?.trim() || '',
      statusHistory: [
        {
          status: 'PENDING',
          timestamp: new Date(),
          note: 'Order submitted by customer. Awaiting offline confirmation.',
          changedBy: 'customer',
        },
      ],
    });

    await order.save();
    return order;
  }

  static async getOrderByNumber(orderNumber: string): Promise<IOrder | null> {
    return Order.findOne({ orderNumber }).lean() as any;
  }

  static async getOrderById(id: string): Promise<IOrder | null> {
    return Order.findById(id).populate('customerId').lean() as any;
  }

  static async updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
    note?: string,
    changedBy = 'admin'
  ): Promise<IOrder> {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.orderStatus = newStatus;
    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date(),
      note: note || `Order status updated to ${newStatus}`,
      changedBy,
    });

    await order.save();
    return order;
  }

  static async confirmPayment(
    orderId: string,
    paymentMode: PaymentMode,
    referenceNumber: string,
    notes: string,
    confirmedBy: string
  ): Promise<{ order: IOrder; payment: any }> {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const payment = new Payment({
      orderId: order._id,
      orderNumber: order.orderNumber,
      amount: order.totalAmount,
      paymentMode,
      status: 'RECEIVED',
      referenceNumber: referenceNumber.trim(),
      notes: notes.trim(),
      confirmedBy,
      confirmedAt: new Date(),
    });

    await payment.save();

    order.paymentStatus = 'RECEIVED';
    order.paymentMode = paymentMode;
    order.paymentDetails = {
      referenceNumber: referenceNumber.trim(),
      confirmedBy,
      confirmedAt: new Date(),
      notes: notes.trim(),
    };

    // If order was in PENDING status, advance it to CONFIRMED
    if (order.orderStatus === 'PENDING') {
      order.orderStatus = 'CONFIRMED';
    }

    order.statusHistory.push({
      status: order.orderStatus,
      timestamp: new Date(),
      note: `Offline payment received via ${paymentMode} (Ref: ${referenceNumber || 'N/A'}) by ${confirmedBy}`,
      changedBy: confirmedBy,
    });

    await order.save();

    return { order, payment };
  }
}

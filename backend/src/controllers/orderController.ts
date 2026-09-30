import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/orderService';
import { Order } from '../models/Order';
import { Setting } from '../models/Setting';
import {
  createOrderSchema,
  updateOrderStatusSchema,
  confirmPaymentSchema,
} from '../validators/orderValidator';
import { generateWhatsAppOrderMessage } from '../utils/whatsapp';
import { AuthRequest } from '../middleware/auth';

export class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = createOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: 'Invalid order input data',
          errors: parsed.error.issues,
        });
        return;
      }

      // OrderService strictly fetches DB prices and ignores any client-supplied totals!
      const order = await OrderService.createOrder(parsed.data as any);

      const settings = await Setting.findOne();
      const whatsapp = generateWhatsAppOrderMessage(order, settings?.whatsappNumber);

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          subtotal: order.subtotal,
          deliveryFee: order.deliveryFee,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          orderType: order.orderType,
          itemsCount: order.items.length,
          whatsappUrl: whatsapp.url,
          order,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create order',
      });
    }
  }

  static async getOrderByNumber(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { orderNumber } = req.params;
      const order = await Order.findOne({ orderNumber }).lean();

      if (!order) {
        res.status(404).json({ success: false, message: 'Order not found' });
        return;
      }

      const settings = await Setting.findOne();
      const whatsapp = generateWhatsAppOrderMessage(order as any, settings?.whatsappNumber);

      res.json({
        success: true,
        data: {
          ...order,
          whatsappUrl: whatsapp.url,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAdminOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        orderStatus,
        paymentStatus,
        orderType,
        search,
        startDate,
        endDate,
        page = '1',
        limit = '20',
      } = req.query;

      const filter: any = {};

      if (orderStatus) {
        filter.orderStatus = orderStatus;
      }
      if (paymentStatus) {
        filter.paymentStatus = paymentStatus;
      }
      if (orderType) {
        filter.orderType = orderType;
      }

      if (search && (search as string).trim()) {
        const s = (search as string).trim();
        const searchRegex = new RegExp(s, 'i');
        filter.$or = [
          { orderNumber: searchRegex },
          { 'customerSnapshot.name': searchRegex },
          { 'customerSnapshot.mobile': searchRegex },
        ];
      }

      if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate as string);
        if (endDate) {
          const end = new Date(endDate as string);
          end.setHours(23, 59, 59, 999);
          filter.createdAt.$lte = end;
        }
      }

      const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
      const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
      const skip = (pageNum - 1) * limitNum;

      const [orders, total] = await Promise.all([
        Order.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Order.countDocuments(filter),
      ]);

      res.json({
        success: true,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
        limit: limitNum,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAdminOrderById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const order = await Order.findById(id).populate('customerId').lean();

      if (!order) {
        res.status(404).json({ success: false, message: 'Order not found' });
        return;
      }

      const settings = await Setting.findOne();
      const whatsapp = generateWhatsAppOrderMessage(order as any, settings?.whatsappNumber);

      res.json({
        success: true,
        data: {
          ...order,
          whatsappUrl: whatsapp.url,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateOrderStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = updateOrderStatusSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: 'Invalid status update',
          errors: parsed.error.issues,
        });
        return;
      }

      const adminIdentifier = req.user?.email || req.user?.name || 'admin';
      const updatedOrder = await OrderService.updateOrderStatus(
        String(req.params.id),
        parsed.data.orderStatus as any,
        parsed.data.note,
        adminIdentifier
      );

      res.json({
        success: true,
        message: `Order status updated to ${parsed.data.orderStatus}`,
        data: updatedOrder,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Status update failed' });
    }
  }

  static async confirmPayment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = confirmPaymentSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: 'Invalid payment confirmation data',
          errors: parsed.error.issues,
        });
        return;
      }

      const adminIdentifier = req.user?.email || req.user?.name || 'admin';
      const result = await OrderService.confirmPayment(
        String(req.params.id),
        parsed.data.paymentMode as any,
        parsed.data.referenceNumber,
        parsed.data.notes,
        adminIdentifier
      );

      res.json({
        success: true,
        message: 'Offline payment successfully confirmed',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Payment confirmation failed' });
    }
  }
}

import { Schema, model, Document, Types } from 'mongoose';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PACKED'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'COMPLETED'
  | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'RECEIVED' | 'REFUNDED';

export type PaymentMode = 'CASH' | 'UPI_OFFLINE' | 'BANK_TRANSFER' | 'OTHER';

export type OrderType = 'PICKUP' | 'DELIVERY';

export interface IOrderItem {
  productId: Types.ObjectId;
  productName: string;
  packQuantity: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  image?: string;
}

export interface IStatusHistory {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
  changedBy?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  customerId: Types.ObjectId;
  customerSnapshot: {
    name: string;
    mobile: string;
    whatsapp?: string;
    email?: string;
  };
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  orderType: OrderType;
  deliveryAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  preferredDate?: string;
  paymentStatus: PaymentStatus;
  paymentMode: PaymentMode;
  orderStatus: OrderStatus;
  customerNotes?: string;
  statusHistory: IStatusHistory[];
  paymentDetails?: {
    referenceNumber?: string;
    confirmedBy?: string;
    confirmedAt?: Date;
    notes?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    packQuantity: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    lineTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const StatusHistorySchema = new Schema<IStatusHistory>(
  {
    status: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      default: '',
    },
    changedBy: {
      type: String,
      default: 'system',
    },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      index: true,
    },
    customerSnapshot: {
      name: { type: String, required: true },
      mobile: { type: String, required: true },
      whatsapp: { type: String, default: '' },
      email: { type: String, default: '' },
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: [(val: any[]) => val.length > 0, 'Order must contain at least one item'],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    orderType: {
      type: String,
      enum: ['PICKUP', 'DELIVERY'],
      default: 'DELIVERY',
    },
    deliveryAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, default: 'Tamil Nadu' },
      pincode: { type: String, required: true },
    },
    preferredDate: {
      type: String,
      default: '',
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'RECEIVED', 'REFUNDED'],
      default: 'PENDING',
      index: true,
    },
    paymentMode: {
      type: String,
      enum: ['CASH', 'UPI_OFFLINE', 'BANK_TRANSFER', 'OTHER'],
      default: 'CASH',
    },
    orderStatus: {
      type: String,
      enum: [
        'PENDING',
        'CONFIRMED',
        'PACKED',
        'READY_FOR_PICKUP',
        'OUT_FOR_DELIVERY',
        'COMPLETED',
        'CANCELLED',
      ],
      default: 'PENDING',
      index: true,
    },
    customerNotes: {
      type: String,
      default: '',
    },
    statusHistory: {
      type: [StatusHistorySchema],
      default: () => [
        {
          status: 'PENDING',
          timestamp: new Date(),
          note: 'Order placed by customer',
          changedBy: 'customer',
        },
      ],
    },
    paymentDetails: {
      referenceNumber: { type: String, default: '' },
      confirmedBy: { type: String, default: '' },
      confirmedAt: { type: Date },
      notes: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ 'customerSnapshot.mobile': 1 });

export const Order = model<IOrder>('Order', OrderSchema);

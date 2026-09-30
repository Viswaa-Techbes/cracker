import { Schema, model, Document, Types } from 'mongoose';
import { PaymentMode, PaymentStatus } from './Order';

export interface IPayment extends Document {
  orderId: Types.ObjectId;
  orderNumber: string;
  amount: number;
  paymentMode: PaymentMode;
  status: PaymentStatus;
  referenceNumber?: string;
  notes?: string;
  confirmedBy: string;
  confirmedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      index: true,
    },
    orderNumber: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMode: {
      type: String,
      enum: ['CASH', 'UPI_OFFLINE', 'BANK_TRANSFER', 'OTHER'],
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'RECEIVED', 'REFUNDED'],
      default: 'RECEIVED',
      index: true,
    },
    referenceNumber: {
      type: String,
      default: '',
      trim: true,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
    confirmedBy: {
      type: String,
      required: true,
      trim: true,
    },
    confirmedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

PaymentSchema.index({ createdAt: -1 });

export const Payment = model<IPayment>('Payment', PaymentSchema);

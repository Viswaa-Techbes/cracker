import { z } from 'zod';

export const createOrderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z
    .string()
    .min(10, 'Mobile must be at least 10 digits')
    .max(15, 'Mobile cannot exceed 15 digits')
    .regex(/^[0-9+]+$/, 'Mobile must contain only digits'),
  whatsapp: z.string().optional().default(''),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional().default('Tamil Nadu'),
  pincode: z
    .string()
    .min(6, 'Pincode must be 6 digits')
    .max(6, 'Pincode must be 6 digits')
    .regex(/^[0-9]{6}$/, 'Pincode must be 6 numeric digits'),
  orderType: z.enum(['PICKUP', 'DELIVERY']).default('DELIVERY'),
  preferredDate: z.string().optional().default(''),
  customerNotes: z.string().optional().default(''),
  transportationCharge: z.number().min(0, 'Transportation charge cannot be negative').optional().default(0),
  deliveryFee: z.number().min(0).optional().default(0),
  items: z
    .array(createOrderItemSchema)
    .min(1, 'Order must contain at least one product item'),
});

export const updateOrderStatusSchema = z.object({
  orderStatus: z.enum([
    'PENDING',
    'CONFIRMED',
    'PACKED',
    'READY_FOR_PICKUP',
    'OUT_FOR_DELIVERY',
    'COMPLETED',
    'CANCELLED',
  ]),
  note: z.string().optional(),
});

export const confirmPaymentSchema = z.object({
  paymentMode: z.enum(['CASH', 'UPI_OFFLINE', 'BANK_TRANSFER', 'OTHER']),
  referenceNumber: z.string().optional().default(''),
  notes: z.string().optional().default(''),
});

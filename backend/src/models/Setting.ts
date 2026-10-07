import { Schema, model, Document } from 'mongoose';

export interface ISetting extends Document {
  storeName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  minimumOrderAmount: number;
  freeDeliveryThreshold: number;
  deliveryFee: number;
  allowedPincodes: string[];
  bannerNotice: string;
  legalDisclaimer: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    storeName: {
      type: String,
      default: 'Sparkle Crackers Sivakasi',
      trim: true,
    },
    phone: {
      type: String,
      default: '+91 98765 43210',
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: '919876543210',
      trim: true,
    },
    email: {
      type: String,
      default: 'contact@sparklecrackers.com',
      trim: true,
    },
    address: {
      type: String,
      default: 'Main Bazaar, Near Clock Tower, Sivakasi',
      trim: true,
    },
    city: {
      type: String,
      default: 'Sivakasi',
      trim: true,
    },
    state: {
      type: String,
      default: 'Tamil Nadu',
      trim: true,
    },
    pincode: {
      type: String,
      default: '626123',
      trim: true,
    },
    pickupEnabled: {
      type: Boolean,
      default: true,
    },
    deliveryEnabled: {
      type: Boolean,
      default: true,
    },
    minimumOrderAmount: {
      type: Number,
      default: 500,
    },
    freeDeliveryThreshold: {
      type: Number,
      default: 3000,
    },
    deliveryFee: {
      type: Number,
      default: 100,
    },
    allowedPincodes: {
      type: [String],
      default: [],
    },
    bannerNotice: {
      type: String,
      default: 'Festive Season Sale! Browse our 2026 catalogue. Offline confirmation for all orders.',
    },
    legalDisclaimer: {
      type: String,
      default:
        'As per No.R4(2)83/CC 405/2023 compliance of Directives of honourable Supreme Court of India in WP (C) 728 of 2015 - Reg, we don’t sell any sort of crackers or any related activities with relevant to purchases. The catalog is just to view the products and understand.',
    },
  },
  {
    timestamps: true,
  }
);

export const Setting = model<ISetting>('Setting', SettingSchema);

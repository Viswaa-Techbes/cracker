import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  categoryId: Types.ObjectId;
  image: string;
  images: string[];
  packQuantity: string;
  price: number;
  description?: string;
  isActive: boolean;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK';
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category ID is required'],
      index: true,
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    packQuantity: {
      type: String,
      required: [true, 'Pack quantity is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    stockStatus: {
      type: String,
      enum: ['IN_STOCK', 'OUT_OF_STOCK'],
      default: 'IN_STOCK',
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
ProductSchema.index({ name: 'text', description: 'text' });

export const Product = model<IProduct>('Product', ProductSchema);

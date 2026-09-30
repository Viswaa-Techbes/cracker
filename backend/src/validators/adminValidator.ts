import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  categoryId: z.string().min(1, 'Category is required'),
  packQuantity: z.string().min(1, 'Pack quantity is required'),
  price: z.coerce.number().min(0, 'Price must be 0 or greater'),
  image: z.string().min(1, 'Image is required'),
  images: z.array(z.string()).optional().default([]),
  description: z.string().optional().default(''),
  stockStatus: z.enum(['IN_STOCK', 'OUT_OF_STOCK']).default('IN_STOCK'),
  isActive: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  description: z.string().optional().default(''),
  image: z.string().optional().default('/uploads/categories/default.png'),
  isActive: z.boolean().optional().default(true),
  displayOrder: z.coerce.number().optional().default(0),
});

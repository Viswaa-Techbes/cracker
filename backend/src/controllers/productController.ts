import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { productSchema } from '../validators/adminValidator';
import { slugify } from '../utils/slugify';

export class ProductController {
  static async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        q,
        category,
        categoryId,
        minPrice,
        maxPrice,
        sort,
        page = '1',
        limit = '24',
        all,
        featured,
      } = req.query;

      const filter: any = {};

      // Inactive filter
      if (all !== 'true') {
        filter.isActive = true;
      }

      if (featured === 'true') {
        filter.isFeatured = true;
      }

      // Category filter (by slug or by ID)
      if (category) {
        const foundCategory = await Category.findOne({ slug: (category as string).toLowerCase() });
        if (foundCategory) {
          filter.categoryId = foundCategory._id;
        } else {
          res.json({
            success: true,
            total: 0,
            page: 1,
            totalPages: 0,
            data: [],
          });
          return;
        }
      } else if (categoryId && mongoose.Types.ObjectId.isValid(categoryId as string)) {
        filter.categoryId = new mongoose.Types.ObjectId(categoryId as string);
      }

      // Search query (case-insensitive regex for names and keywords)
      if (q && (q as string).trim()) {
        const searchRegex = new RegExp((q as string).trim(), 'i');
        filter.$or = [{ name: searchRegex }, { description: searchRegex }, { packQuantity: searchRegex }];
      }

      // Price filter
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      // Sorting
      let sortOption: any = { createdAt: -1 };
      switch (sort) {
        case 'price_asc':
          sortOption = { price: 1 };
          break;
        case 'price_desc':
          sortOption = { price: -1 };
          break;
        case 'name_asc':
          sortOption = { name: 1 };
          break;
        case 'name_desc':
          sortOption = { name: -1 };
          break;
        case 'newest':
          sortOption = { createdAt: -1 };
          break;
        default:
          sortOption = { createdAt: -1 };
      }

      const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
      const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 24));
      const skip = (pageNum - 1) * limitNum;

      const [products, total] = await Promise.all([
        Product.find(filter)
          .populate('categoryId', 'name slug')
          .sort(sortOption)
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Product.countDocuments(filter),
      ]);

      res.json({
        success: true,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
        limit: limitNum,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await Product.findOne({
        slug: String(req.params.slug).toLowerCase(),
        isActive: true,
      })
        .populate('categoryId', 'name slug')
        .lean();

      if (!product) {
        res.status(404).json({ success: false, message: 'Product not found' });
        return;
      }

      // Fetch up to 4 related products in the same category
      const relatedProducts = await Product.find({
        categoryId: (product.categoryId as any)._id,
        _id: { $ne: product._id },
        isActive: true,
      })
        .limit(4)
        .lean();

      res.json({
        success: true,
        data: {
          ...product,
          relatedProducts,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = productSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: parsed.error.issues,
        });
        return;
      }

      const {
        name,
        categoryId,
        packQuantity,
        price,
        image,
        images,
        description,
        stockStatus,
        isActive,
        isFeatured,
      } = parsed.data;

      let slug = slugify(name);
      const existing = await Product.findOne({ slug });
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      const product = await Product.create({
        name,
        slug,
        categoryId: new mongoose.Types.ObjectId(categoryId),
        packQuantity,
        price,
        image,
        images: images || [],
        description: description || '',
        stockStatus: stockStatus || 'IN_STOCK',
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
      });

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        res.status(404).json({ success: false, message: 'Product not found' });
        return;
      }

      const {
        name,
        categoryId,
        packQuantity,
        price,
        image,
        images,
        description,
        stockStatus,
        isActive,
        isFeatured,
      } = req.body;

      if (name && name !== product.name) {
        product.name = name;
        product.slug = slugify(name);
      }
      if (categoryId) product.categoryId = new mongoose.Types.ObjectId(categoryId);
      if (packQuantity) product.packQuantity = packQuantity;
      if (price !== undefined) product.price = Number(price);
      if (image) product.image = image;
      if (images) product.images = images;
      if (description !== undefined) product.description = description;
      if (stockStatus) product.stockStatus = stockStatus;
      if (isActive !== undefined) product.isActive = Boolean(isActive);
      if (isFeatured !== undefined) product.isFeatured = Boolean(isFeatured);

      await product.save();

      res.json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        res.status(404).json({ success: false, message: 'Product not found' });
        return;
      }

      // Soft delete: Keep existing order snapshots intact!
      product.isActive = false;
      await product.save();

      res.json({
        success: true,
        message: 'Product deactivated successfully (soft-delete)',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
}

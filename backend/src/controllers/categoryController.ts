import { Request, Response, NextFunction } from 'express';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { categorySchema } from '../validators/adminValidator';
import { slugify } from '../utils/slugify';

export class CategoryController {
  static async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const includeInactive = req.query.all === 'true';
      const filter = includeInactive ? {} : { isActive: true };

      const categories = await Category.find(filter)
        .sort({ displayOrder: 1, name: 1 })
        .lean();

      // Attach active product count for each category
      const categoriesWithCount = await Promise.all(
        categories.map(async (cat) => {
          const productCount = await Product.countDocuments({
            categoryId: cat._id,
            isActive: true,
          });
          return {
            ...cat,
            productCount,
          };
        })
      );

      res.json({
        success: true,
        count: categoriesWithCount.length,
        data: categoriesWithCount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await Category.findOne({
        slug: String(req.params.slug).toLowerCase(),
        isActive: true,
      }).lean();

      if (!category) {
        res.status(404).json({ success: false, message: 'Category not found' });
        return;
      }

      const productCount = await Product.countDocuments({
        categoryId: category._id,
        isActive: true,
      });

      res.json({
        success: true,
        data: {
          ...category,
          productCount,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = categorySchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: parsed.error.issues,
        });
        return;
      }

      const { name, description, image, isActive, displayOrder } = parsed.data;
      let slug = slugify(name);

      // Ensure unique slug
      let existing = await Category.findOne({ slug });
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      const category = await Category.create({
        name,
        slug,
        description,
        image: image || '/uploads/categories/default.png',
        isActive: isActive !== undefined ? isActive : true,
        displayOrder: displayOrder || 0,
      });

      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        res.status(404).json({ success: false, message: 'Category not found' });
        return;
      }

      const { name, description, image, isActive, displayOrder } = req.body;

      if (name && name !== category.name) {
        category.name = name;
        category.slug = slugify(name);
      }
      if (description !== undefined) category.description = description;
      if (image !== undefined) category.image = image;
      if (isActive !== undefined) category.isActive = isActive;
      if (displayOrder !== undefined) category.displayOrder = displayOrder;

      await category.save();

      res.json({
        success: true,
        message: 'Category updated successfully',
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        res.status(404).json({ success: false, message: 'Category not found' });
        return;
      }

      // Soft delete: toggle isActive
      category.isActive = false;
      await category.save();

      res.json({
        success: true,
        message: 'Category deactivated successfully (soft-delete)',
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
}

import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', CategoryController.getCategories);
router.get('/:slug', CategoryController.getCategoryBySlug);

// Admin-only routes
router.post('/', authenticateAdmin, CategoryController.createCategory);
router.put('/:id', authenticateAdmin, CategoryController.updateCategory);
router.delete('/:id', authenticateAdmin, CategoryController.deleteCategory);

export default router;

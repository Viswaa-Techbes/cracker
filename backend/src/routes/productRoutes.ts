import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', ProductController.getProducts);
router.get('/:slug', ProductController.getProductBySlug);

// Admin-only routes
router.post('/', authenticateAdmin, ProductController.createProduct);
router.put('/:id', authenticateAdmin, ProductController.updateProduct);
router.delete('/:id', authenticateAdmin, ProductController.deleteProduct);

export default router;

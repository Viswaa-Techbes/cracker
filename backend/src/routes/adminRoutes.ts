import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { OrderController } from '../controllers/orderController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Public read-only settings for store info, banners, allowed pincodes
router.get('/settings/public', AdminController.getSettings);

// All subsequent routes require admin authentication
router.use(authenticateAdmin);

// Dashboard overview
router.get('/dashboard', AdminController.getDashboardStats);

// Orders management
router.get('/orders', OrderController.getAdminOrders);
router.get('/orders/:id', OrderController.getAdminOrderById);
router.patch('/orders/:id/status', OrderController.updateOrderStatus);
router.patch('/orders/:id/payment', OrderController.confirmPayment);
router.post('/orders/:id/payment', OrderController.confirmPayment);

// Payments ledger
router.get('/payments', AdminController.getPayments);
router.post('/payments/:id/confirm', OrderController.confirmPayment);

// Settings management
router.get('/settings', AdminController.getSettings);
router.put('/settings', AdminController.updateSettings);

export default router;

import { Router } from 'express';
import { OrderController } from '../controllers/orderController';

const router = Router();

// Public order placement
router.post('/', OrderController.createOrder);

// Public order lookup by unique order number (e.g. ORD-2026-000001)
router.get('/:orderNumber', OrderController.getOrderByNumber);

export default router;

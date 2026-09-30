import { Router } from 'express';
import { CustomerController } from '../controllers/customerController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.use(authenticateAdmin);

router.get('/', CustomerController.getCustomers);
router.get('/:id', CustomerController.getCustomerById);

export default router;

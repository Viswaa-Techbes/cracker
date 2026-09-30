import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', authenticateAdmin, AuthController.getMe);

export default router;

import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/me', authenticate, userController.getMyProfile);
router.patch('/profile', authenticate, userController.updateProfile);
router.patch('/avatar', authenticate, userController.updateAvatar);
// Admin only
router.get('/', authenticate, requireAdmin, userController.getAllUsers);
router.patch('/:id/role', authenticate, requireAdmin, userController.updateUserRole);

export default router;
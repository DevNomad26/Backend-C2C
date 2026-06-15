import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import * as campController from '../controllers/camp.controller';

const router = Router();

// Public routes
router.get('/', campController.getAllCamps);
router.get('/:id', campController.getCampById);

// Admin only routes
router.post('/', authenticate, requireAdmin, campController.createCamp);
router.patch('/:id', authenticate, requireAdmin, campController.updateCamp);
router.delete('/:id', authenticate, requireAdmin, campController.deleteCamp);
router.get('/:id/registrations', authenticate, requireAdmin, campController.getCampRegistrations);

export default router;
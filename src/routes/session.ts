import { Router } from 'express';
import { authenticate, requireSenior, requireAdmin } from '../middleware/auth';
import * as sessionController from '../controllers/session.controller';

const router = Router();

// Public routes — anyone can view sessions
router.get('/', sessionController.getAllSessions);
router.get('/:id', sessionController.getSessionById);

// Protected routes — seniors and admins only
router.post('/', authenticate, requireSenior, sessionController.createSession);
router.patch('/:id', authenticate, requireSenior, sessionController.updateSession);

// Admin and senior can delete (ownership check is inside controller)
router.delete('/:id', authenticate, requireSenior, sessionController.deleteSession);

export default router;
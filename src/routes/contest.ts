import { Router } from 'express';
import { authenticate, requireSenior, requireAdmin } from '../middleware/auth';
import * as contestController from '../controllers/contest.controller';

const router = Router();

// Public routes
router.get('/', contestController.getAllContests);
router.get('/:id', contestController.getContestById);
//unlocking the link for contest
router.post('/:id/unlock', authenticate, contestController.unlockContest);
// Protected routes — seniors and admins only
router.post('/', authenticate, requireSenior, contestController.createContest);
router.patch('/:id', authenticate, requireSenior, contestController.updateContest);
router.delete('/:id', authenticate, requireSenior, contestController.deleteContest);

export default router;
import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import * as syncController from '../controllers/sync.controller';

const router = Router();

router.post('/contest/:contestId', authenticate, requireAdmin, syncController.syncContest);

export default router;
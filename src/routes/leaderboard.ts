import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as leaderboardController from '../controllers/leaderboard.controller';

const router = Router();
    
router.get('/', authenticate, leaderboardController.getOverallLeaderboard);

export default router;
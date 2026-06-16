import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as leaderboardController from '../controllers/leaderboard.controller';

const router = Router();

// Year-wise leaderboard — requires ?year=1|2|3|4
router.get('/', authenticate, leaderboardController.getLeaderboard);

export default router;
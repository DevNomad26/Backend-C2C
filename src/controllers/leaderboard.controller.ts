import { Request, Response } from 'express';
import * as leaderboardService from '../services/leaderboard.service';

// GET /api/leaderboard
export const getOverallLeaderboard = async (_req: Request, res: Response) => {
  try {
    const leaderboard = await leaderboardService.getOverallLeaderboard();
    res.json({ success: true, data: leaderboard });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leaderboard' });
  }
};
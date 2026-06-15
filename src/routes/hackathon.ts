import { Router } from 'express';
import { authenticate, requireAdmin, optionalAuthenticate } from '../middleware/auth';
import * as hackathonController from '../controllers/hackathon.controller';

const router = Router();

// Public — basic info
router.get('/', hackathonController.getAllHackathons);

// Smart route — returns different data based on role
// optional Authenticate middleware — controller handles the role check internally
router.get('/:id', optionalAuthenticate, hackathonController.getHackathonById);

// Admin only
router.post('/', authenticate, requireAdmin, hackathonController.createHackathon);
router.patch('/:id', authenticate, requireAdmin, hackathonController.updateHackathon);
router.delete('/:id', authenticate, requireAdmin, hackathonController.deleteHackathon);
router.get('/:id/registrations', authenticate, requireAdmin, hackathonController.getHackathonRegistrations);

export default router;
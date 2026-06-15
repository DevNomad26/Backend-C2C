import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as teamController from '../controllers/team.controller';

// mergeParams lets this router access :hackathonId from the parent route
const router = Router({ mergeParams: true });

router.post('/', authenticate, teamController.createTeam);
router.post('/join', authenticate, teamController.joinTeam);

export default router;
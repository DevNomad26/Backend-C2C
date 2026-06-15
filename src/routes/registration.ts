import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as registrationController from '../controllers/registration.controller';

const router = Router();

// All registration routes require login
router.post('/camp/:campId', authenticate, registrationController.registerForCamp);
router.post('/hackathon/:hackathonId', authenticate, registrationController.registerForHackathon);
router.get('/my', authenticate, registrationController.getMyRegistrations);

export default router;
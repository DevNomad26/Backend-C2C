import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as calendarController from '../controllers/calendar.controller';

const router = Router();

router.get('/', authenticate, calendarController.getCalendar);

export default router;
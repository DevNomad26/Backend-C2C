import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as uploadController from '../controllers/upload.controller';

const router = Router();

//must be logged in to get an upload signature
router.post('/signature', authenticate, uploadController.getUploadSignature);

export default router;
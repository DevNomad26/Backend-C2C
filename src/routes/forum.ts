import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as forumController from '../controllers/forum.controller';
import { strictLimiter } from '../middleware/rateLimiter';
const router = Router();

// Posts
router.get('/', authenticate, forumController.getAllPosts);
router.get('/:id', authenticate, forumController.getPostById);
router.post('/', authenticate, strictLimiter ,forumController.createPost);
router.patch('/:id', authenticate, forumController.updatePost);
router.delete('/:id', authenticate, forumController.deletePost);

// Upvote
router.post('/:id/upvote', authenticate, forumController.toggleUpvote);

// Comments
router.post('/:id/comments', authenticate, strictLimiter ,forumController.createComment);
router.patch('/comments/:commentId', authenticate, forumController.updateComment);
router.delete('/comments/:commentId', authenticate, forumController.deleteComment);

export default router;
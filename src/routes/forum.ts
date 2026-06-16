import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as forumController from '../controllers/forum.controller';

const router = Router();

// Posts
router.get('/', authenticate, forumController.getAllPosts);
router.get('/:id', authenticate, forumController.getPostById);
router.post('/', authenticate, forumController.createPost);
router.patch('/:id', authenticate, forumController.updatePost);
router.delete('/:id', authenticate, forumController.deletePost);

// Upvote
router.post('/:id/upvote', authenticate, forumController.toggleUpvote);

// Comments
router.post('/:id/comments', authenticate, forumController.createComment);
router.patch('/comments/:commentId', authenticate, forumController.updateComment);
router.delete('/comments/:commentId', authenticate, forumController.deleteComment);

export default router;
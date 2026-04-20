import express from 'express';
import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import {
  createPostSchema,
  updatePostSchema,
} from '../validations/postValidation.js';

import {
  createPostController,
  getFeedController,
  getPostController,
  updatePostController,
  deletePostController,
} from '../controllers/postController.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  validate(createPostSchema),
  createPostController
);

router.get('/', authenticateToken, getFeedController);

router.get('/:id', authenticateToken, getPostController);

router.put(
  '/:id',
  authenticateToken,
  validate(updatePostSchema),
  updatePostController
);

router.delete('/:id', authenticateToken, deletePostController);

export default router;
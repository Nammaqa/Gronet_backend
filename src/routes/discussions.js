import express from 'express';
import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  createDiscussionSchema,
  updateDiscussionSchema,
} from '../validations/discussionValidation.js';

import {
  createDiscussionController,
  getDiscussionsByGroupController,
  getDiscussionController,
  updateDiscussionController,
  deleteDiscussionController,
  getAllDiscussionsController,
} from '../controllers/discussionController.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  validate(createDiscussionSchema),
  createDiscussionController
);

router.get(
  '/group/:groupId',
  authenticateToken,
  getDiscussionsByGroupController
);

router.get('/:id', authenticateToken, getDiscussionController);
router.get('/', authenticateToken, getAllDiscussionsController);

router.put(
  '/:id',
  authenticateToken,
  validate(updateDiscussionSchema),
  updateDiscussionController
);

router.delete('/:id', authenticateToken, deleteDiscussionController);

export default router;
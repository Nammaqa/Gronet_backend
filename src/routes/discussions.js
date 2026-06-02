import express from 'express';
import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  createDiscussionSchema,
  updateDiscussionSchema,
  idParamSchema,
  groupParamSchema,
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
  validate(groupParamSchema, 'params'),
  getDiscussionsByGroupController
);

router.get(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  getDiscussionController
);

router.get('/', authenticateToken, getAllDiscussionsController);

router.put(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  validate(updateDiscussionSchema),
  updateDiscussionController
);

router.delete(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  deleteDiscussionController
);

export default router;
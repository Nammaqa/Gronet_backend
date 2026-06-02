import express from 'express';
import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  createReplySchema,
  discussionParamSchema,
  parentReplyParamSchema,
} from '../validations/discussionReplyValidation.js';

import {
  createReplyController,
  getRepliesTreeController,
  getRootRepliesController,
  getChildRepliesController,
} from '../controllers/discussionReplyController.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  validate(createReplySchema),
  createReplyController
);

router.get(
  '/tree/:discussionId',
  authenticateToken,
  validate(discussionParamSchema, 'params'),
  getRepliesTreeController
);

router.get(
  '/root/:discussionId',
  authenticateToken,
  validate(discussionParamSchema, 'params'),
  getRootRepliesController
);

router.get(
  '/children/:parentReplyId',
  authenticateToken,
  validate(parentReplyParamSchema, 'params'),
  getChildRepliesController
);

export default router;
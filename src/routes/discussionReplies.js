import express from 'express';
import authenticateToken from '../middleware/auth.js';

import {
  createReplyController,
  getRootRepliesController,
  getChildRepliesController
} from '../controllers/discussionReplyController.js';

const router = express.Router();

router.post('/', authenticateToken, createReplyController);
router.get(
  '/root/:discussionId',
  authenticateToken,
  getRootRepliesController
);
router.get(
  '/children/:parentReplyId',
  authenticateToken,
  getChildRepliesController
);

export default router;
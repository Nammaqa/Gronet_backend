import express from 'express';

import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  sendMessageSchema,
  editMessageSchema,
} from '../validations/messageValidation.js';

import {
  sendMessageController,
  getConversationController,
  getConversationsController,
  markConversationAsReadController,
  getUnreadCountController,
  editMessageController,
} from '../controllers/messageController.js';

const router = express.Router();


router.use(authenticateToken);

router.post(
  '/',
  validate(sendMessageSchema),
  sendMessageController
);


router.get(
  '/conversations',
  getConversationsController
);


router.get(
  '/unread-count',
  getUnreadCountController
);


router.patch(
  '/read/:userId',
  markConversationAsReadController
);


router.patch(
  '/:id',
  validate(editMessageSchema),
  editMessageController
);

router.get(
  '/:userId',
  getConversationController
);

export default router;
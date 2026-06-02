import express from 'express';

import authenticateToken from '../middleware/auth.js';

import {
  getNotificationsController,
  getUnreadCountController,
  markAsReadController,
  markAllAsReadController,
} from '../controllers/notificationController.js';

const router = express.Router();

router.use(authenticateToken);

router.get(
  '/',
  getNotificationsController
);

router.get(
  '/unread-count',
  getUnreadCountController
);

router.patch(
  '/read-all',
  markAllAsReadController
);

router.patch(
  '/:id/read',
  markAsReadController
);

export default router;
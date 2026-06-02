import express from 'express';
import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  sendConnectionSchema,
  handleRequestSchema,
} from '../validations/connectionValidation.js';

import {
  sendConnectionRequestController,
  acceptConnectionRequestController,
  rejectConnectionRequestController,
  getConnectionsController,
  getPendingRequestsController,
} from '../controllers/connectionController.js';

const router = express.Router();

router.use(authenticateToken);

router.post(
  '/send',
  validate(sendConnectionSchema),
  sendConnectionRequestController
);

router.post(
  '/accept',
  validate(handleRequestSchema),
  acceptConnectionRequestController
);

router.post(
  '/reject',
  validate(handleRequestSchema),
  rejectConnectionRequestController
);

router.get('/', getConnectionsController);
router.get('/pending', getPendingRequestsController);

export default router;
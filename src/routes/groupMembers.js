import express from 'express';
import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  joinGroupSchema,
  handleRequestSchema,
  leaveGroupSchema,
} from '../validations/groupMemberValidation.js';

import {
  joinGroupController,
  approveRequestController,
  rejectRequestController,
  leaveGroupController,
} from '../controllers/groupMemberController.js';

const router = express.Router();

router.post(
  '/join',
  authenticateToken,
  validate(joinGroupSchema),
  joinGroupController
);

router.post(
  '/approve',
  authenticateToken,
  validate(handleRequestSchema),
  approveRequestController
);

router.post(
  '/reject',
  authenticateToken,
  validate(handleRequestSchema),
  rejectRequestController
);

router.post(
  '/leave',
  authenticateToken,
  validate(leaveGroupSchema),
  leaveGroupController
);

export default router;
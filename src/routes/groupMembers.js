import express from 'express';
import authenticateToken from '../middleware/auth.js';

import {
  joinGroupController,
  approveRequestController,
  rejectRequestController,
  leaveGroupController,
} from '../controllers/groupMemberController.js';

const router = express.Router();

router.post('/join', authenticateToken, joinGroupController);
router.post('/approve', authenticateToken, approveRequestController);
router.post('/reject', authenticateToken, rejectRequestController);
router.post('/leave', authenticateToken, leaveGroupController);

export default router;
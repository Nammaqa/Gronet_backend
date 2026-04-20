import express from 'express';
import authenticateToken from '../middleware/auth.js';
import {
  updateInterests,
  fetchMyInterests,
} from '../controllers/userInterestController.js';

const router = express.Router();

router.post('/', authenticateToken, updateInterests);

router.get('/me', authenticateToken, fetchMyInterests);

export default router;
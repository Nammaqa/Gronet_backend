import express from 'express';
import { getProfile, getProfileByUserID } from '../controllers/profileController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Get current user profile (requires authentication)
router.get('/me', authenticateToken, getProfile);

// Get profile by userID (requires authentication)
router.get('/:userID', authenticateToken, getProfileByUserID);

export default router;

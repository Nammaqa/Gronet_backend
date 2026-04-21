import express from 'express';
import authenticateToken from '../middleware/auth.js';
import upload from '../middleware/upload.js';

import {
  getProfile,
  getProfileByUserID,
  updateProfile,
  uploadAvatar,
  uploadCoverPhoto,
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/me', authenticateToken, getProfile);
router.get('/:userID', authenticateToken, getProfileByUserID);
router.put('/', authenticateToken, updateProfile);

router.post('/avatar', authenticateToken, upload.single('file'), uploadAvatar);
router.post('/cover', authenticateToken, upload.single('file'), uploadCoverPhoto);

export default router;
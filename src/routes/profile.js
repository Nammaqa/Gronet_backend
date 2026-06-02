import express from 'express';

import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import upload from '../middleware/upload.js';

import {
  updateProfileSchema,
  userIdParamSchema,
} from '../validations/profileValidation.js';

import {
  getMyProfileController,
  getPublicProfileController,
  updateProfileController,
  uploadAvatarController,
  uploadCoverPhotoController,
} from '../controllers/profileController.js';

const router = express.Router();

router.use(authenticateToken);

router.get(
  '/me',
  getMyProfileController
);

router.patch(
  '/me',
  validate(updateProfileSchema),
  updateProfileController
);

router.post(
  '/avatar',
  upload.single('avatar'),
  uploadAvatarController
);

router.post(
  '/cover-photo',
  upload.single('coverPhoto'),
  uploadCoverPhotoController
);


router.get(
  '/:userId',
  validate(
    userIdParamSchema,
    'params'
  ),
  getPublicProfileController
);

export default router;
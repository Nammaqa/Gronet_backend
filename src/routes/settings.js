import express from 'express';

import authenticateToken from '../middleware/auth.js';

import validate from '../middleware/validate.js';

import {
  updateSettingsSchema,
} from '../validations/settingsValidation.js';

import {
  getSettingsController,
  updateSettingsController,
} from '../controllers/settingsController.js';

const router = express.Router();

router.use(authenticateToken);

router.get(
  '/me',
  getSettingsController
);

router.patch(
  '/me',

  validate(updateSettingsSchema),

  updateSettingsController
);

export default router;
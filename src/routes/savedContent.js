import express from 'express';
import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  saveContentSchema,
} from '../validations/savedContentValidation.js';

import {
  saveContentController,
  unsaveContentController,
  getSavedContentController,
} from '../controllers/savedContentController.js';

const router = express.Router();

router.use(authenticateToken);

router.post(
  '/save',
  validate(saveContentSchema),
  saveContentController
);

router.post(
  '/unsave',
  validate(saveContentSchema),
  unsaveContentController
);

router.get(
  '/',
  getSavedContentController
);

export default router;
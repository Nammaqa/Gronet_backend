import express from 'express';

import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  likeContentSchema,
  likeParamsSchema,
} from '../validations/likeValidation.js';

import {
  likeContentController,
  unlikeContentController,
  getLikeCountController,
  checkUserLikedController,
} from '../controllers/likeController.js';

const router = express.Router();

router.use(authenticateToken);

router.post(
  '/',
  validate(likeContentSchema),
  likeContentController
);

router.delete(
  '/',
  validate(likeContentSchema),
  unlikeContentController
);

router.get(
  '/count/:contentType/:contentId',
  validate(likeParamsSchema, 'params'),
  getLikeCountController
);

router.get(
  '/check/:contentType/:contentId',
  validate(likeParamsSchema, 'params'),
  checkUserLikedController
);

export default router;
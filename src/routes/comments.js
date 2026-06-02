import express from 'express';

import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  createCommentSchema,
  editCommentSchema,
  commentParamsSchema,
  commentIdSchema,
} from '../validations/commentValidation.js';

import {
  createCommentController,
  editCommentController,
  deleteCommentController,
  getCommentsController,
  getCommentCountController,
} from '../controllers/commentController.js';

const router = express.Router();

router.use(authenticateToken);

router.post(
  '/',
  validate(createCommentSchema),
  createCommentController
);

router.patch(
  '/:id',
  validate(commentIdSchema, 'params'),
  validate(editCommentSchema),
  editCommentController
);

router.delete(
  '/:id',
  validate(commentIdSchema, 'params'),
  deleteCommentController
);

router.get(
  '/:contentType/:contentId',
  validate(commentParamsSchema, 'params'),
  getCommentsController
);

router.get(
  '/count/:contentType/:contentId',
  validate(commentParamsSchema, 'params'),
  getCommentCountController
);

export default router;
import express from 'express';

import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  createArticleSchema,
  updateArticleSchema,
  articleIdSchema,
} from '../validations/articleValidation.js';

import {
  createArticleController,
  getArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
} from '../controllers/articleController.js';

const router = express.Router();

router.get(
  '/',
  getArticlesController
);

router.get(
  '/:id',
  validate(articleIdSchema, 'params'),
  getArticleByIdController
);

router.use(authenticateToken);

router.post(
  '/',
  validate(createArticleSchema),
  createArticleController
);

router.patch(
  '/:id',
  validate(articleIdSchema, 'params'),
  validate(updateArticleSchema),
  updateArticleController
);

router.delete(
  '/:id',
  validate(articleIdSchema, 'params'),
  deleteArticleController
);

export default router;
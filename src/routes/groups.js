import express from 'express';
import authenticateToken from '../middleware/auth.js';
import validate from '../middleware/validate.js';

import {
  createGroupSchema,
  updateGroupSchema,
  idParamSchema,
} from '../validations/groupValidation.js';

import {
  createGroupController,
  getAllGroupsController,
  getGroupByIdController,
  updateGroupController,
  deleteGroupController
} from '../controllers/groupController.js';
const router = express.Router();

router.post(
  '/',
  authenticateToken,
  validate(createGroupSchema),
  createGroupController
);

router.get('/', authenticateToken, getAllGroupsController);

router.get(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  getGroupByIdController
);

router.put(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  validate(updateGroupSchema),
  updateGroupController
);

router.delete(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  deleteGroupController
);

export default router;
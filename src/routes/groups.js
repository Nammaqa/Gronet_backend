import express from 'express';
import authenticateToken from '../middleware/auth.js';

import {
  createGroupController,
  getAllGroupsController,
  getGroupByIdController
} from '../controllers/groupController.js';

const router = express.Router();

router.post('/', authenticateToken, createGroupController);

router.get('/', authenticateToken, getAllGroupsController);

router.get('/:id', authenticateToken, getGroupByIdController);

export default router;
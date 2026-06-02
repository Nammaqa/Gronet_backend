import express from 'express';

import authenticateToken from '../middleware/auth.js';

import {
  globalSearchController,
} from '../controllers/searchController.js';

const router = express.Router();

router.use(authenticateToken);

router.get(
  '/',
  globalSearchController
);

export default router;
import express from 'express';
import { sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest, getConnections, getPendingRequests } from '../controllers/connectionController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

export default router;
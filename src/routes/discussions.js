import express from 'express';
import { createDiscussion, getDiscussions, getDiscussionById, updateDiscussion, deleteDiscussion } from '../controllers/discussionController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

export default router;
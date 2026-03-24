import express from 'express';
import { createComment, getComments, updateComment, deleteComment, createReply, getReplies } from '../controllers/commentController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

export default router;
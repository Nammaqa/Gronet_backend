import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import postRoutes from './posts.js';
import discussionRoutes from './discussions.js';
import commentRoutes from './comments.js';
import groupRoutes from './groups.js';
import messageRoutes from './messages.js';
import connectionRoutes from './connections.js';
import articleRoutes from './articles.js';
import uploadRoutes from './upload.js';

const router = express.Router();

export default router;
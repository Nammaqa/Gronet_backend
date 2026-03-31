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
import profileRoutes from './profile.js';

const router = express.Router();

// API routes
router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/profile', profileRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/discussions', discussionRoutes);
router.use('/api/comments', commentRoutes);
router.use('/api/groups', groupRoutes);
router.use('/api/messages', messageRoutes);
router.use('/api/connections', connectionRoutes);
router.use('/api/articles', articleRoutes);
router.use('/api/upload', uploadRoutes);

export default router;
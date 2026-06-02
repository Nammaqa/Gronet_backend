import express from 'express';

import authRoutes from './auth.js';
import userRoutes from './users.js';
import postRoutes from './posts.js';
import discussionRoutes from './discussions.js';
import commentRoutes from './comments.js';
import groupRoutes from './groups.js';
import savedContentRoutes from './savedContent.js';
import messageRoutes from './messages.js';
import searchRoutes from './search.js';
import connectionRoutes from './connections.js';
import articleRoutes from './articles.js';
import likeRoutes from './likes.js';
import profileRoutes from './profile.js';
import interestRoutes from './interests.js';
import settingsRoutes from './settings.js';
import discussionReplyRoutes from './discussionReplies.js';
import groupMemberRoutes from './groupMembers.js';
import notificationRoutes from './notifications.js';

const router = express.Router();

/* =========================
   ROUTES (NO /api here)
========================= */

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/profile', profileRoutes);

router.use('/posts', postRoutes);
router.use('/discussions', discussionRoutes);
router.use('/discussion-replies', discussionReplyRoutes);

router.use('/comments', commentRoutes);
router.use('/likes', likeRoutes);
router.use('/settings', settingsRoutes);

router.use('/groups', groupRoutes);
router.use('/group-members', groupMemberRoutes);

router.use('/connections', connectionRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);

router.use('/articles', articleRoutes);
router.use('/interests', interestRoutes);

router.use('/search', searchRoutes);
router.use('/saved', savedContentRoutes);

export default router;
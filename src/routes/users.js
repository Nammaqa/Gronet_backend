// import express from 'express';
// // import { getProfile, updateProfile, getUsers, getUserById, followUser, unfollowUser } from '../controllers/userController.js';
// import authenticateToken from '../middleware/auth.js';

// const router = express.Router();

// export default router;
import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { getProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/me', authenticateToken, getProfile);

export default router; 
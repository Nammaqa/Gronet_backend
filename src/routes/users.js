import express from 'express';
import { getProfile, updateProfile, getUsers, getUserById, followUser, unfollowUser } from '../controllers/userController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

export default router;
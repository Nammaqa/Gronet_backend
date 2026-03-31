import express from 'express';
// import { createPost, getPosts, getPostById, updatePost, deletePost, likePost, unlikePost } from '../controllers/postController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

export default router;
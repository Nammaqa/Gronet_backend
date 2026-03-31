import express from 'express';
// import { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/articleController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

export default router;
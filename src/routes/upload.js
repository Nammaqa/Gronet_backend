import express from 'express';
import { uploadFile, uploadMultipleFiles } from '../controllers/uploadController.js';
import authenticateToken from '../middleware/auth.js';
import upload from '../middleware/fileUpload.js';

const router = express.Router();

export default router;
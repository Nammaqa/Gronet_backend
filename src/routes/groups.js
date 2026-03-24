import express from 'express';
import { createGroup, getGroups, getGroupById, updateGroup, deleteGroup, joinGroup, leaveGroup, getGroupMembers } from '../controllers/groupController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

export default router;
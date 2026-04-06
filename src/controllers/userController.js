import prisma from '../config/database.js';

export const getProfile = (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    user: req.user || null
  });
};
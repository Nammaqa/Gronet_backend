import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const authenticateToken = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
    }

    // Decode token
    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    // Extract user data from decoded token
    const { enquiryId, name, email } = decoded;

    if (!enquiryId || !email) {
      return res.status(403).json({
        success: false,
        message: 'Token must contain enquiryId and email',
      });
    }

    // Check if user exists by enquiryId
    let user = await User.findOne({
      where: { userID: enquiryId },
    });

    if (user) {
      // Update existing user with latest data
      await user.update({
        userID: enquiryId || user.userID,
        email: email || user.email,
        ...(name && { displayName: name }),
      });
    } else {
      // Create new user
      user = await User.create({
        enquiryID: enquiryId,
        userID: enquiryId,
        email,
        displayName: name || email.split('@')[0],
      });
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message,
    });
  }
};

export default authenticateToken;
import axios from 'axios';
import { User } from '../models/index.js';

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token =
      authHeader &&
      authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
    }

    const response = await axios.get(
      `${process.env.AUTH_SERVICE_URL}/api/auth/validate-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      }
    );

    const {
      userId,
      name,
      email,
      role,
    } = response.data;

    if (!userId || !email) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token response',
      });
    }

    const userIdStr = String(userId);

    let user = await User.findOne({
      where: {
        userID: userIdStr,
      },
    });

    if (user) {
      await user.update({
        enquiryID: userIdStr,
        userID: userIdStr,
        email,
        ...(name && {
          displayName: name,
        }),
      });
    } else {
      user = await User.create({
        enquiryID: userIdStr,
        userID: userIdStr,
        email,
        displayName:
          name || email.split('@')[0],
      });
    }

    req.user = user;

    req.auth = {
      userId,
      name,
      email,
      role,
    };

    next();

  } catch (error) {
    console.error(
      'Auth middleware error:',
      error.response?.data ||
      error.message
    );

    if (error.code === 'ECONNABORTED') {
      return res.status(503).json({
        success: false,
        message:
          'Authentication service timeout',
      });
    }

    return res.status(401).json({
      success: false,
      message:
        'Invalid or expired token',
    });
  }
};

export default authenticateToken;
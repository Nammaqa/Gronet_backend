import { UserInterest } from '../models/index.js';

const requireInterests = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const count = await UserInterest.count({
      where: { userId },
    });

    if (count === 0) {
      return res.status(403).json({
        success: false,
        message: 'Please select at least one interest to continue',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default requireInterests;
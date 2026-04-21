import {
  setUserInterests,
  getUserInterests,
} from '../services/userInterestService.js';

export const updateInterests = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { interestIds } = req.body || {};

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (!interestIds) {
      return res.status(400).json({
        success: false,
        message: 'interestIds is required',
      });
    }

    if (!Array.isArray(interestIds) || interestIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one interest is required',
      });
    }

    const uniqueIds = [...new Set(interestIds)];

    if (uniqueIds.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Too many interests selected',
      });
    }

    const result = await setUserInterests(userId, uniqueIds);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        count: result.count,
      },
    });

  } catch (error) {
    next(error);
  }
};


export const fetchMyInterests = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const interests = await getUserInterests(userId);

    return res.status(200).json({
      success: true,
      data: interests,
    });

  } catch (error) {
    next(error);
  }
};

// export const updateInterests = (req, res) => {
//   res.json({ msg: "update works" });
// };

// export const fetchMyInterests = (req, res) => {
//   res.json({ msg: "fetch works" });
// };
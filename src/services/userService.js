// import { User } from '../models/index.js';

// export const getUserById = async (userId) => {
//   return await User.findByPk(userId, {
//     attributes: [
//       'id',
//       'userID',
//       'displayName',
//       'designation',
//       'bio',
//       'avatar',
//       'coverPhoto',
//       'skills',
//     ],
//   });
// };

// export const getUserByUserID = async (userID) => {
//   return await User.findOne({
//     where: { userID },
//     attributes: [
//       'id',
//       'userID',
//       'displayName',
//       'designation',
//       'bio',
//       'avatar',
//       'coverPhoto',
//       'skills',
//     ],
//   });
// };

// export const updateUser = async (userId, updateData) => {
//   const user = await User.findByPk(userId);

//   if (!user) throw new Error('User not found');

//   const allowedFields = [
//     'displayName',
//     'designation',
//     'bio',
//     'skills',
//     'avatar',
//     'coverPhoto',
//   ];

//   const filteredData = {};

//   for (const key of allowedFields) {
//     if (updateData[key] !== undefined) {
//       filteredData[key] = updateData[key];
//     }
//   }

//   await user.update(filteredData);

//   return user;
// };

import { User } from '../models/index.js';

export const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: [
        'id',
        'userID',
        'displayName',
        'designation',
        'bio',
        'avatar',
        'coverPhoto',
        'skills',
      ],
    });

    if (!user) {
      throw {
        message: 'User not found',
        status: 404,
      };
    }

    return user;

  } catch (error) {
    console.error('getUserById failed:', error);

    throw {
      message: error.message || 'Failed to fetch user',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


export const getUserByUserID = async (userID) => {
  try {
    const user = await User.findOne({
      where: { userID },
      attributes: [
        'id',
        'userID',
        'displayName',
        'designation',
        'bio',
        'avatar',
        'coverPhoto',
        'skills',
      ],
    });

    if (!user) {
      throw {
        message: 'User not found',
        status: 404,
      };
    }

    return user;

  } catch (error) {
    console.error('getUserByUserID failed:', error);

    throw {
      message: error.message || 'Failed to fetch user',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


export const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw {
        message: 'User not found',
        status: 404,
      };
    }

    const allowedFields = [
      'displayName',
      'designation',
      'bio',
      'skills',
      'avatar',
      'coverPhoto',
    ];

    const filteredData = {};

    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        filteredData[key] = updateData[key];
      }
    }

    const updatedUser = await user.update(filteredData);

    return updatedUser;

  } catch (error) {
    console.error('updateUser failed:', error);

    throw {
      message: error.message || 'Failed to update user',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


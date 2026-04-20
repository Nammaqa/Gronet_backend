import { User } from '../models/index.js';

export const getUserById = async (userId) => {
  return await User.findByPk(userId, {
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
};

export const getUserByUserID = async (userID) => {
  return await User.findOne({
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
};

export const updateUser = async (userId, updateData) => {
  const user = await User.findByPk(userId);

  if (!user) throw new Error('User not found');

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

  await user.update(filteredData);

  return user;
};
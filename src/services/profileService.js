import { User } from '../models/index.js';

const error = (message, status = 400) => {
  const e = new Error(message);
  e.status = status;
  return e;
};

export const getMyProfile = async (
  userId
) => {
  const user = await User.findByPk(
    userId,
    {
      attributes: [
        'id',
        'userID',
        'email',
        'phone',

        'displayName',
        'headline',
        'designation',
        'bio',
        'location',

        'avatar',
        'coverPhoto',

        'skills',

        'github',
        'linkedin',
        'portfolio',

        'createdAt',
      ],
    }
  );

  if (!user) {
    throw error(
      'User not found',
      404
    );
  }

  return user;
};

export const getPublicProfile =
  async (userId) => {
    const user =
      await User.findByPk(userId, {
        attributes: [
          'id',
          'userID',

          'displayName',
          'headline',
          'designation',
          'bio',
          'location',

          'avatar',
          'coverPhoto',

          'skills',

          'github',
          'linkedin',
          'portfolio',

          'createdAt',
        ],
      });

    if (!user) {
      throw error(
        'User not found',
        404
      );
    }

    return user;
  };

export const updateProfile =
  async (userId, data) => {
    const user =
      await User.findByPk(userId);

    if (!user) {
      throw error(
        'User not found',
        404
      );
    }

    const allowedFields = [
      'displayName',
      'headline',
      'designation',
      'bio',
      'location',

      'avatar',
      'coverPhoto',

      'skills',

      'github',
      'linkedin',
      'portfolio',
    ];

    const filteredData = {};

    for (const field of allowedFields) {
      if (
        data[field] !== undefined
      ) {
        filteredData[field] =
          data[field];
      }
    }

    await user.update(filteredData);

    return user;
  };
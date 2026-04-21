import { sequelize, User, Interest } from '../models/index.js';

export const setUserInterests = async (userId, interestIds) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction });

    if (!user) {
      throw new Error('User not found');
    }

    const uniqueIds = [...new Set(interestIds)];

    if (uniqueIds.length > 20) {
      throw new Error('Too many interests selected');
    }

    const interests = await Interest.findAll({
      where: { id: uniqueIds },
      transaction,
    });

    if (interests.length !== uniqueIds.length) {
      throw new Error('Invalid interest IDs');
    }

    // Sequelize magic (handles join table automatically)
    await user.setInterests(interests, { transaction });

    await transaction.commit();

    return {
      message: 'Interests updated successfully',
      count: interests.length,
    };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


export const getUserInterests = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Interest,
        as: 'interests',
        attributes: ['id', 'name', 'category'],
        through: { attributes: [] },
      },
    ],
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.interests;
};
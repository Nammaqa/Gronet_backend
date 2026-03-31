import { User } from '../models/index.js';

// Create or update a user (upsert logic)
export const upsertUser = async (enquiryID, userID, email, name) => {
  try {
    let user = await User.findOne({
      where: { enquiryID },
    });

    if (user) {
      // Update existing user
      await user.update({
        userID: userID || user.userID,
        email: email || user.email,
        ...(name && { displayName: name }),
      });
    } else {
      // Create new user
      user = await User.create({
        enquiryID,
        userID: userID || `USR_${enquiryID}`,
        email,
        displayName: name || email.split('@')[0],
      });
    }

    return user;
  } catch (error) {
    console.error('Error in upsertUser:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error;
  }
};

export const getUserByUserID = async (userID) => {
  try {
    const user = await User.findOne({
      where: { userID },
    });
    return user;
  } catch (error) {
    console.error('Error in getUserByUserID:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    throw error;
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(updateData);
    return user;
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
};

export const getAllUsers = async (limit = 10, offset = 0) => {
  try {
    const users = await User.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    return users;
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw error;
  }
};
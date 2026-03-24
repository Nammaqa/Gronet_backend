export const createUser = async (userData) => {
  return userData;
};

export const getUserById = async (userId) => {
  return { id: userId };
};

export const updateUser = async (userId, updateData) => {
  return { id: userId, ...updateData };
};

export const deleteUser = async (userId) => {
  return { message: 'User deleted' };
};
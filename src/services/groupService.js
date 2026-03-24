export const createGroup = async (groupData) => {
  return groupData;
};

export const getGroups = async (filters) => {
  return [];
};

export const deleteGroup = async (groupId) => {
  return { message: 'Group deleted' };
};

export const addMember = async (groupId, userId) => {
  return { groupId, userId };
};

export const removeMember = async (groupId, userId) => {
  return { message: 'Member removed' };
};
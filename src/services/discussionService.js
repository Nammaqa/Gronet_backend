export const createDiscussion = async (discussionData) => {
  return discussionData;
};

export const getDiscussions = async (filters) => {
  return [];
};

export const updateDiscussion = async (discussionId, updateData) => {
  return { id: discussionId, ...updateData };
};

export const deleteDiscussion = async (discussionId) => {
  return { message: 'Discussion deleted' };
};
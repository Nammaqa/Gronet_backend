export const likePost = async (postId, userId) => {
  return { postId, userId, liked: true };
};

export const unlikePost = async (postId, userId) => {
  return { postId, userId, liked: false };
};

export const getLikes = async (postId) => {
  return [];
};


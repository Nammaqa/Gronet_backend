import { Discussion } from '../models/index.js';

export const createDiscussion = async (userId, data) => {
  return await Discussion.create({
    authorId: userId,
    ...data,
  });
};

export const getDiscussionsByGroup = async (groupId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Discussion.findAndCountAll({
    where: {
      groupId,
      isPublic: true,
      isDraft: false,
    },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
    data: rows,
  };
};

export const getAllDiscussions = async () => {
  return await Discussion.findAll({
    order: [['createdAt', 'DESC']],
  });
};

export const getDiscussionById = async (id) => {
  const discussion = await Discussion.findByPk(id);

  if (!discussion) {
    const error = new Error('Discussion not found');
    error.status = 404;
    throw error;
  }

  return discussion;
};

export const updateDiscussion = async (id, userId, data) => {
  const discussion = await Discussion.findByPk(id);

  if (!discussion) {
    const error = new Error('Discussion not found');
    error.status = 404;
    throw error;
  }

  if (discussion.authorId !== userId) {
    const error = new Error('Unauthorized');
    error.status = 403;
    throw error;
  }

  return await discussion.update(data);
};

export const deleteDiscussion = async (id, userId) => {
  const discussion = await Discussion.findByPk(id);

  if (!discussion) {
    const error = new Error('Discussion not found');
    error.status = 404;
    throw error;
  }

  if (discussion.authorId !== userId) {
    const error = new Error('Unauthorized');
    error.status = 403;
    throw error;
  }

  await discussion.destroy();

  return { message: 'Discussion deleted successfully' };
};
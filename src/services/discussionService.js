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

export const getDiscussionById = async (id) => {
  return await Discussion.findByPk(id);
};

export const updateDiscussion = async (id, userId, data) => {
  const discussion = await Discussion.findByPk(id);

  if (!discussion) throw new Error('Discussion not found');

  if (discussion.authorId !== userId) {
    throw new Error('Unauthorized');
  }

  return await discussion.update(data);
};

export const deleteDiscussion = async (id, userId) => {
  const discussion = await Discussion.findByPk(id);

  if (!discussion) throw new Error('Discussion not found');

  if (discussion.authorId !== userId) {
    throw new Error('Unauthorized');
  }

  await discussion.destroy();
};
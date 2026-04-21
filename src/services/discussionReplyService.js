import { Discussion, DiscussionReply } from '../models/index.js';
export const createReply = async (userId, data) => {
  const { discussionId, parentReplyId, content } = data;

  if (!content) throw new Error('Content required');

  const discussion = await Discussion.findByPk(discussionId);
  if (!discussion) throw new Error('Discussion not found');

  if (parentReplyId) {
    const parent = await DiscussionReply.findByPk(parentReplyId);
    if (!parent) throw new Error('Parent reply not found');
  }

  return await DiscussionReply.create({
    authorId: userId,
    discussionId,
    parentReplyId: parentReplyId || null,
    content,
  });
};


export const getRepliesTree = async (discussionId) => {
  const replies = await DiscussionReply.findAll({
    where: { discussionId },
    order: [['createdAt', 'ASC']],
  });

  const data = replies.map(r => r.toJSON());

  const map = {};

  data.forEach(reply => {
    map[reply.id] = {
      ...reply,
      replies: [],
    };
  });

  const tree = [];

  data.forEach(reply => {
    if (reply.parentReplyId) {
      if (map[reply.parentReplyId]) {
        map[reply.parentReplyId].replies.push(map[reply.id]);
      }
    } else {
      tree.push(map[reply.id]);
    }
  });

  return tree;
};


export const getRootReplies = async (discussionId, page = 1, limit = 5) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await DiscussionReply.findAndCountAll({
    where: {
      discussionId,
      parentReplyId: null,
    },
    limit,
    offset,
    order: [['createdAt', 'ASC']],
  });

  return {
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
    data: rows,
  };
};


export const getChildReplies = async (parentReplyId) => {
  return await DiscussionReply.findAll({
    where: { parentReplyId },
    order: [['createdAt', 'ASC']],
  });
};
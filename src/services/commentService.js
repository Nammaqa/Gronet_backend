import {
  Comment,
  Post,
  Discussion,
  Article,
  User,
} from '../models/index.js';

import { createNotification } from './notificationService.js';

const error = (message, status = 400) => {
  const e = new Error(message);
  e.status = status;
  return e;
};

const getModelByType = (type) => {
  switch (type) {
    case 'post':
      return Post;

    case 'discussion':
      return Discussion;

    case 'article':
      return Article;

    default:
      throw error('Invalid content type');
  }
};

export const createComment = async (
  authorId,
  {
    content,
    contentId,
    contentType,
    parentId = null,
  }
) => {

  if (!content || !content.trim()) {
    throw error('Comment content required');
  }

  const Model = getModelByType(
    contentType
  );

  const target = await Model.findByPk(
    contentId
  );

  if (!target) {
    throw error(
      `${contentType} not found`,
      404
    );
  }

  if (parentId) {
    const parent =
      await Comment.findByPk(parentId);

    if (!parent) {
      throw error(
        'Parent comment not found',
        404
      );
    }
  }

  const comment = await Comment.create({
    content: content.trim(),

    contentId,

    contentType,

    parentId,

    authorId,
  });

  try {
    const ownerId =
      target.authorId;

    if (ownerId !== authorId) {
      await createNotification({
        userId: ownerId,

        type: 'comment',

        title: 'New Comment',

        message:
          'Someone commented on your content',

        referenceId: comment.id,
      });
    }

  } catch (notificationError) {
    console.error(
      'COMMENT NOTIFICATION ERROR:',
      notificationError
    );
  }

  return comment;
};

export const editComment = async (
  commentId,
  userId,
  content
) => {
  if (!content || !content.trim()) {
    throw error('Comment content required');
  }

  const comment = await Comment.findByPk(
    commentId
  );

  if (!comment) {
    throw error(
      'Comment not found',
      404
    );
  }

  if (comment.authorId !== userId) {
    throw error('Unauthorized', 403);
  }

  comment.content = content.trim();

  await comment.save();

  return comment;
};

export const deleteComment = async (
  commentId,
  userId
) => {
  const comment = await Comment.findByPk(
    commentId
  );

  if (!comment) {
    throw error(
      'Comment not found',
      404
    );
  }

  if (comment.authorId !== userId) {
    throw error('Unauthorized', 403);
  }

  await comment.destroy();

  return {
    message:
      'Comment deleted successfully',
  };
};

export const getComments = async (
  contentId,
  contentType
) => {
  const comments =
    await Comment.findAll({
      where: {
        contentId,
        contentType,
      },

      include: [
        {
          model: User,
          as: 'author',
          attributes: [
            'id',
            'displayName',
            'avatar',
          ],
        },
      ],

      order: [['createdAt', 'ASC']],
    });

  return comments;
};

export const getCommentCount =
  async (
    contentId,
    contentType
  ) => {
    const count =
      await Comment.count({
        where: {
          contentId,
          contentType,
        },
      });

    return {
      count,
    };
  };
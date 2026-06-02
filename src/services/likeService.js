import {
  Like,
  Post,
  Discussion,
  Article,
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

export const likeContent = async (
  userId,
  contentId,
  contentType
) => {
  const Model = getModelByType(
    contentType
  );

  const content = await Model.findByPk(
    contentId
  );

  if (!content) {
    throw error(
      `${contentType} not found`,
      404
    );
  }

  const existing = await Like.findOne({
    where: {
      userId,
      contentId,
      contentType,
    },
  });

  if (existing) {
    throw error(
      'Content already liked'
    );
  }

  const like = await Like.create({
    userId,
    contentId,
    contentType,
  });

  try {
    const ownerId =
      content.authorId;

    if (ownerId !== userId) {
      await createNotification({
        userId: ownerId,

        type: 'post_like',

        title: 'New Like',

        message:
          'Someone liked your content',

        referenceId: contentId,
      });
    }

  } catch (notificationError) {
    console.error(
      'LIKE NOTIFICATION ERROR:',
      notificationError
    );
  }

  return like;
};

export const unlikeContent = async (
  userId,
  contentId,
  contentType
) => {
  const like = await Like.findOne({
    where: {
      userId,
      contentId,
      contentType,
    },
  });

  if (!like) {
    throw error(
      'Like not found',
      404
    );
  }

  await like.destroy();

  return {
    message:
      'Content unliked successfully',
  };
};

export const getLikeCount = async (
  contentId,
  contentType
) => {
  const count = await Like.count({
    where: {
      contentId,
      contentType,
    },
  });

  return {
    count,
  };
};

export const checkUserLiked = async (
  userId,
  contentId,
  contentType
) => {
  const liked = await Like.findOne({
    where: {
      userId,
      contentId,
      contentType,
    },
  });

  return {
    liked: !!liked,
  };
};
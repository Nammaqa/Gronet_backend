import { Post } from '../models/index.js';

const error = (message, status = 400) => {
  const e = new Error(message);
  e.status = status;
  return e;
};

export const createPost = async (userId, data) => {
  const post = await Post.create({
    authorId: userId,
    ...data,
  });

  return post;
};

export const getFeed = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Post.findAndCountAll({
    where: {
      isPublic: true,
      isDraft: false,
    },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });

  return {
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
    data: rows,
  };
};

export const getPostById = async (slug) => {
  const post = await Post.findOne({
    where: { slug },
  });

  if (!post) {
    throw error('Post not found', 404);
  }

  return post;
};

export const updatePost = async (slug, userId, data) => {
  const post = await Post.findOne({
    where: { slug },
  });

  if (!post) {
    throw error('Post not found', 404);
  }

  if (post.authorId !== userId) {
    throw error('Unauthorized', 403);
  }

  const updated = await post.update(data);
  return updated;
};

export const deletePost = async (slug, userId) => {
  const post = await Post.findOne({
    where: { slug },
  });

  if (!post) {
    throw error('Post not found', 404);
  }

  if (post.authorId !== userId) {
    throw error('Unauthorized', 403);
  }

  await post.destroy();

  return { message: 'Post deleted successfully' };
};
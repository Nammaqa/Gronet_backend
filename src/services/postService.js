import { Post, UserInterest, Interest } from '../models/index.js';

export const createPost = async (userId, data) => {
  return await Post.create({
    authorId: userId,
    ...data,
  });
};


export const getFeed = async (userId, page = 1, limit = 10) => {
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

export const getPostById = async (id) => {
  return await Post.findByPk(id);
};

export const updatePost = async (postId, userId, data) => {
  const post = await Post.findByPk(postId);

  if (!post) throw new Error('Post not found');

  if (post.authorId !== userId) {
    throw new Error('Unauthorized');
  }

  return await post.update(data);
};

export const deletePost = async (postId, userId) => {
  const post = await Post.findByPk(postId);

  if (!post) throw new Error('Post not found');

  if (post.authorId !== userId) {
    throw new Error('Unauthorized');
  }

  await post.destroy();
};
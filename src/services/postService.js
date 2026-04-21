// import { Post, UserInterest, Interest } from '../models/index.js';

// export const createPost = async (userId, data) => {
//   return await Post.create({
//     authorId: userId,
//     ...data,
//   });
// };


// export const getFeed = async (userId, page = 1, limit = 10) => {
//   const offset = (page - 1) * limit;

//   const { count, rows } = await Post.findAndCountAll({
//     where: {
//       isPublic: true,
//       isDraft: false,
//     },
//     order: [['createdAt', 'DESC']],
//     limit,
//     offset,
//   });

//   return {
//     total: count,
//     page,
//     totalPages: Math.ceil(count / limit),
//     data: rows,
//   };
// };

// export const getPostById = async (id) => {
//   return await Post.findByPk(id);
// };

// export const updatePost = async (postId, userId, data) => {
//   const post = await Post.findByPk(postId);

//   if (!post) throw new Error('Post not found');

//   if (post.authorId !== userId) {
//     throw new Error('Unauthorized');
//   }

//   return await post.update(data);
// };

// export const deletePost = async (postId, userId) => {
//   const post = await Post.findByPk(postId);

//   if (!post) throw new Error('Post not found');

//   if (post.authorId !== userId) {
//     throw new Error('Unauthorized');
//   }

//   await post.destroy();
// };



import { Post } from '../models/index.js';

export const createPost = async (userId, data) => {
  try {
    const post = await Post.create({
      authorId: userId,
      ...data,
    });

    return post;

  } catch (error) {
    console.error('createPost failed:', error);

    throw {
      message: 'Failed to create post',
      originalError: error.message,
      status: 500,
    };
  }
};


export const getFeed = async (userId, page = 1, limit = 10) => {
  try {
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

  } catch (error) {
    console.error('getFeed failed:', error);

    throw {
      message: 'Failed to fetch feed',
      originalError: error.message,
      status: 500,
    };
  }
};


export const getPostById = async (id) => {
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      throw {
        message: 'Post not found',
        status: 404,
      };
    }

    return post;

  } catch (error) {
    console.error('getPostById failed:', error);

    throw {
      message: error.message || 'Failed to fetch post',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


export const updatePost = async (postId, userId, data) => {
  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      throw {
        message: 'Post not found',
        status: 404,
      };
    }

    if (post.authorId !== userId) {
      throw {
        message: 'Unauthorized',
        status: 403,
      };
    }

    const updatedPost = await post.update(data);

    return updatedPost;

  } catch (error) {
    console.error('updatePost failed:', error);

    throw {
      message: error.message || 'Failed to update post',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


export const deletePost = async (postId, userId) => {
  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      throw {
        message: 'Post not found',
        status: 404,
      };
    }

    if (post.authorId !== userId) {
      throw {
        message: 'Unauthorized',
        status: 403,
      };
    }

    await post.destroy();

    return { message: 'Post deleted successfully' };

  } catch (error) {
    console.error('deletePost failed:', error);

    throw {
      message: error.message || 'Failed to delete post',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};
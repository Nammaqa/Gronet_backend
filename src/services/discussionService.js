// import { Discussion } from '../models/index.js';

// export const createDiscussion = async (userId, data) => {
//   return await Discussion.create({
//     authorId: userId,
//     ...data,
//   });
// };

// export const getDiscussionsByGroup = async (groupId, page = 1, limit = 10) => {
//   const offset = (page - 1) * limit;

//   const { count, rows } = await Discussion.findAndCountAll({
//     where: {
//       groupId,
//       isPublic: true,
//       isDraft: false,
//     },
//     limit,
//     offset,
//     order: [['createdAt', 'DESC']],
//   });

//   return {
//     total: count,
//     page,
//     totalPages: Math.ceil(count / limit),
//     data: rows,
//   };
// };

// export const getDiscussionById = async (id) => {
//   return await Discussion.findByPk(id);
// };

// export const updateDiscussion = async (id, userId, data) => {
//   const discussion = await Discussion.findByPk(id);

//   if (!discussion) throw new Error('Discussion not found');

//   if (discussion.authorId !== userId) {
//     throw new Error('Unauthorized');
//   }

//   return await discussion.update(data);
// };

// export const deleteDiscussion = async (id, userId) => {
//   const discussion = await Discussion.findByPk(id);

//   if (!discussion) throw new Error('Discussion not found');

//   if (discussion.authorId !== userId) {
//     throw new Error('Unauthorized');
//   }

//   await discussion.destroy();
// };



import { Discussion } from '../models/index.js';

export const createDiscussion = async (userId, data) => {
  try {
    const discussion = await Discussion.create({
      authorId: userId,
      ...data,
    });

    return discussion;

  } catch (error) {
    console.error('createDiscussion failed:', error);

    throw {
      message: 'Failed to create discussion',
      originalError: error.message,
      status: 500,
    };
  }
};


export const getDiscussionsByGroup = async (groupId, page = 1, limit = 10) => {
  try {
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

  } catch (error) {
    console.error('getDiscussionsByGroup failed:', error);

    throw {
      message: 'Failed to fetch discussions',
      originalError: error.message,
      status: 500,
    };
  }
};


export const getDiscussionById = async (id) => {
  try {
    const discussion = await Discussion.findByPk(id);

    if (!discussion) {
      throw {
        message: 'Discussion not found',
        status: 404,
      };
    }

    return discussion;

  } catch (error) {
    console.error('getDiscussionById failed:', error);

    throw {
      message: error.message || 'Failed to fetch discussion',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


export const updateDiscussion = async (id, userId, data) => {
  try {
    const discussion = await Discussion.findByPk(id);

    if (!discussion) {
      throw {
        message: 'Discussion not found',
        status: 404,
      };
    }

    if (discussion.authorId !== userId) {
      throw {
        message: 'Unauthorized',
        status: 403,
      };
    }

    const updated = await discussion.update(data);

    return updated;

  } catch (error) {
    console.error('updateDiscussion failed:', error);

    throw {
      message: error.message || 'Failed to update discussion',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


export const deleteDiscussion = async (id, userId) => {
  try {
    const discussion = await Discussion.findByPk(id);

    if (!discussion) {
      throw {
        message: 'Discussion not found',
        status: 404,
      };
    }

    if (discussion.authorId !== userId) {
      throw {
        message: 'Unauthorized',
        status: 403,
      };
    }

    await discussion.destroy();

    return { message: 'Discussion deleted successfully' };

  } catch (error) {
    console.error('deleteDiscussion failed:', error);

    throw {
      message: error.message || 'Failed to delete discussion',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};
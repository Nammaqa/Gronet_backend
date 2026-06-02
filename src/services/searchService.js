import { Op } from 'sequelize';

import {
  User,
  Post,
  Discussion,
  Group,
  Article,
} from '../models/index.js';

export const globalSearch = async (
  query
) => {
  if (
    !query ||
    !query.trim()
  ) {
    return {
      users: [],
      posts: [],
      discussions: [],
      groups: [],
      articles: [],
    };
  }

  const search =
    `%${query.trim()}%`;

  /* =========================
     USERS
  ========================= */

  const users =
    await User.findAll({
      where: {
        [Op.or]: [
          {
            displayName: {
              [Op.like]: search,
            },
          },
          {
            userID: {
              [Op.like]: search,
            },
          },
          {
            bio: {
              [Op.like]: search,
            },
          },
          {
            designation: {
              [Op.like]: search,
            },
          },
        ],
      },

      attributes: [
        'id',
        'userID',
        'displayName',
        'designation',
        'bio',
        'avatar',
      ],

      limit: 10,
    });

  /* =========================
     POSTS
  ========================= */

  const posts =
    await Post.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: search,
            },
          },
          {
            content: {
              [Op.like]: search,
            },
          },
          {
            community: {
              [Op.like]: search,
            },
          },
          {
            industry: {
              [Op.like]: search,
            },
          },
        ],
      },

      limit: 10,

      order: [
        ['createdAt', 'DESC'],
      ],
    });

  /* =========================
     DISCUSSIONS
  ========================= */

  const discussions =
    await Discussion.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: search,
            },
          },
          {
            content: {
              [Op.like]: search,
            },
          },
        ],
      },

      limit: 10,

      order: [
        ['createdAt', 'DESC'],
      ],
    });

  /* =========================
     GROUPS
  ========================= */

  const groups =
    await Group.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: search,
            },
          },
          {
            about: {
              [Op.like]: search,
            },
          },
          {
            industry: {
              [Op.like]: search,
            },
          },
        ],
      },

      limit: 10,

      order: [
        ['createdAt', 'DESC'],
      ],
    });

  /* =========================
     ARTICLES
  ========================= */

  const articles =
    await Article.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: search,
            },
          },
          {
            content: {
              [Op.like]: search,
            },
          },
        ],
      },

      limit: 10,

      order: [
        ['createdAt', 'DESC'],
      ],
    });

  return {
    users,
    posts,
    discussions,
    groups,
    articles,
  };
};
import { Article, User } from '../models/index.js';

const error = (message, status = 400) => {
  const e = new Error(message);
  e.status = status;
  return e;
};


export const createArticle = async (
  userId,
  data
) => {
  const article = await Article.create({
    authorId: userId,

    title: data.title.trim(),

    content: data.content.trim(),

    category: data.category || null,

    tags: data.tags || [],
  });

  return article;
};


export const getArticles = async (
  page = 1,
  limit = 10
) => {
  const offset = (page - 1) * limit;

  const { count, rows } =
    await Article.findAndCountAll({
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

      order: [['createdAt', 'DESC']],

      limit,

      offset,
    });

  return {
    total: count,

    page,

    totalPages: Math.ceil(
      count / limit
    ),

    data: rows,
  };
};


export const getArticleById = async (
  articleId
) => {
  const article =
    await Article.findByPk(articleId, {
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
    });

  if (!article) {
    throw error(
      'Article not found',
      404
    );
  }

  return article;
};


export const updateArticle = async (
  articleId,
  userId,
  data
) => {
  const article =
    await Article.findByPk(articleId);

  if (!article) {
    throw error(
      'Article not found',
      404
    );
  }

  if (article.authorId !== userId) {
    throw error('Unauthorized', 403);
  }


  if (data.title !== undefined) {
    article.title =
      data.title.trim();
  }

  if (data.content !== undefined) {
    article.content =
      data.content.trim();
  }

  if (data.category !== undefined) {
    article.category =
      data.category;
  }

  if (data.tags !== undefined) {
    article.tags = data.tags;
  }

  await article.save();

  return article;
};


export const deleteArticle = async (
  articleId,
  userId
) => {
  const article =
    await Article.findByPk(articleId);

  if (!article) {
    throw error(
      'Article not found',
      404
    );
  }

  if (article.authorId !== userId) {
    throw error('Unauthorized', 403);
  }

  await article.destroy();

  return {
    message:
      'Article deleted successfully',
  };
};
import * as models from '../models/index.js';

const { SavedContent, Post, Discussion, Article } = models;

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

export const saveContent = async (userId, contentSlug, contentType) => {
  const Model = getModelByType(contentType);

  const content = await Model.findOne({
    where: { slug: contentSlug },
  });

  if (!content) {
    throw error(`${contentType} not found`, 404);
  }

  const existing = await SavedContent.findOne({
    where: {
      userId,
      contentId: content.id,
      contentType,
    },
  });

  if (existing) {
    throw error('Content already saved');
  }

  const saved = await SavedContent.create({
    userId,
    contentId: content.id, 
    contentType,
  });

  return saved;
};

export const unsaveContent = async (userId, contentSlug, contentType) => {
  const Model = getModelByType(contentType);

  const content = await Model.findOne({
    where: { slug: contentSlug },
  });

  if (!content) {
    throw error(`${contentType} not found`, 404);
  }

  const saved = await SavedContent.findOne({
    where: {
      userId,
      contentId: content.id,
      contentType,
    },
  });

  if (!saved) {
    throw error('Saved content not found', 404);
  }

  await saved.destroy();

  return { message: 'Removed from saved' };
};

export const getSavedContent = async (userId) => {
  const savedItems = await SavedContent.findAll({
    where: { userId },
    order: [['savedAt', 'DESC']],
  });

  const results = [];

  for (const item of savedItems) {
    const Model = getModelByType(item.contentType);

    const content = await Model.findByPk(item.contentId);

    if (content) {
      results.push({
        id: item.id,
        type: item.contentType,
        savedAt: item.savedAt,
        data: content,
      });
    }
  }

  return results;
};
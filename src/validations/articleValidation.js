import Joi from 'joi';

export const createArticleSchema =
  Joi.object({
    title: Joi.string()
      .trim()
      .required(),

    content: Joi.string()
      .trim()
      .required(),

    category: Joi.string()
      .trim()
      .optional()
      .allow(null, ''),

    tags: Joi.array()
      .items(Joi.string())
      .optional(),
  });

export const updateArticleSchema =
  Joi.object({
    title: Joi.string()
      .trim()
      .optional(),

    content: Joi.string()
      .trim()
      .optional(),

    category: Joi.string()
      .trim()
      .optional()
      .allow(null, ''),

    tags: Joi.array()
      .items(Joi.string())
      .optional(),
  });


export const articleIdSchema =
  Joi.object({
    id: Joi.string()
      .uuid()
      .required(),
  });
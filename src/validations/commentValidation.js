import Joi from 'joi';

export const createCommentSchema =
  Joi.object({
    content: Joi.string()
      .trim()
      .required(),

    contentId: Joi.string()
      .uuid()
      .required(),

    contentType: Joi.string()
      .valid(
        'post',
        'discussion',
        'article'
      )
      .required(),

    parentId: Joi.string()
      .uuid()
      .optional()
      .allow(null),
  });

export const editCommentSchema =
  Joi.object({
    content: Joi.string()
      .trim()
      .required(),
  });

export const commentParamsSchema =
  Joi.object({
    contentId: Joi.string()
      .uuid()
      .required(),

    contentType: Joi.string()
      .valid(
        'post',
        'discussion',
        'article'
      )
      .required(),
  });

export const commentIdSchema =
  Joi.object({
    id: Joi.string()
      .uuid()
      .required(),
  });
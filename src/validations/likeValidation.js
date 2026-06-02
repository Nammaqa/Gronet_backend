import Joi from 'joi';

export const likeContentSchema =
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

export const likeParamsSchema =
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
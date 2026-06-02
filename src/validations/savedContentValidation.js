import Joi from 'joi';

export const saveContentSchema = Joi.object({
  contentSlug: Joi.string().min(6).max(50).required(),

  contentType: Joi.string()
    .valid('post', 'discussion', 'article')
    .required(),
});

export const getSavedContentSchema = Joi.object({
  type: Joi.string()
    .valid('post', 'discussion', 'article')
    .optional(),
});
import Joi from 'joi';

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),

  content: Joi.string().min(1).required(),

  coverImage: Joi.string().uri().allow(null, ''),

  community: Joi.string().required(),

  industry: Joi.string().required(),

  tags: Joi.array().items(Joi.string()).max(10),

  isPublic: Joi.boolean().default(true),

  isDraft: Joi.boolean().default(false),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(200),

  content: Joi.string(),

  coverImage: Joi.string().uri().allow(null, ''),

  community: Joi.string(),

  industry: Joi.string(),

  tags: Joi.array().items(Joi.string()).max(10),

  isPublic: Joi.boolean(),

  isDraft: Joi.boolean(),
});
import Joi from 'joi';

export const createDiscussionSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),

  content: Joi.string().required(),

  groupId: Joi.string().uuid().required(),

  coverImage: Joi.string().uri().allow('', null),

  tags: Joi.array().items(Joi.string()).max(10),

  isPublic: Joi.boolean().default(true),

  isDraft: Joi.boolean().default(false),
});

export const updateDiscussionSchema = Joi.object({
  title: Joi.string().min(3).max(200),

  content: Joi.string(),

  coverImage: Joi.string().uri().allow('', null),

  tags: Joi.array().items(Joi.string()).max(10),

  isPublic: Joi.boolean(),

  isDraft: Joi.boolean(),
});
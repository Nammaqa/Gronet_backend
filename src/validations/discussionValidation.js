import Joi from 'joi';

export const createDiscussionSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(1).required(),
  coverImage: Joi.string().uri().allow(null, ''),
  images: Joi.array().items(Joi.string().uri()).max(5),
  tags: Joi.array().items(Joi.string()).max(10),
  isPublic: Joi.boolean().default(true),
  isDraft: Joi.boolean().default(false),
});

export const updateDiscussionSchema = Joi.object({
  title: Joi.string().min(3).max(200),
  content: Joi.string(),
  coverImage: Joi.string().uri().allow(null, ''),
  images: Joi.array().items(Joi.string().uri()).max(5),
  tags: Joi.array().items(Joi.string()).max(10),
  isPublic: Joi.boolean(),
  isDraft: Joi.boolean(),
});

export const idParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const groupParamSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
});
import Joi from 'joi';

export const createReplySchema = Joi.object({
  discussionId: Joi.string().uuid().required(),
  parentReplyId: Joi.string().uuid().allow(null),
  content: Joi.string().min(1).required(),
});

export const discussionParamSchema = Joi.object({
  discussionId: Joi.string().uuid().required(),
});

export const parentReplyParamSchema = Joi.object({
  parentReplyId: Joi.string().uuid().required(),
});
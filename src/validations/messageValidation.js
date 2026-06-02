import Joi from 'joi';

export const sendMessageSchema = Joi.object({
  recipientId: Joi.string()
    .uuid()
    .required(),

  content: Joi.string()
    .trim()
    .min(1)
    .max(5000)
    .required(),
});

export const editMessageSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(5000)
    .required(),
});
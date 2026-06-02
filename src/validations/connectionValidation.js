import Joi from 'joi';

export const sendConnectionSchema = Joi.object({
  recipientId: Joi.string().uuid().required(),
});

export const handleRequestSchema = Joi.object({
  requestId: Joi.string().uuid().required(),
});
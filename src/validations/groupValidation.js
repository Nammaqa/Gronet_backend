import Joi from 'joi';

export const createGroupSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  about: Joi.string().min(10).required(),
  industry: Joi.string().required(),
  guidelines: Joi.string().allow('', null),
  type: Joi.string().valid('public', 'private').default('public'),
});
export const updateGroupSchema = Joi.object({
  name: Joi.string().optional(),

  about: Joi.string().optional(),

  industry: Joi.string().optional(),

  guidelines: Joi.string().allow('').optional(),

  type: Joi.string()
    .valid('public', 'private')
    .optional(),

  status: Joi.string()
    .valid('active', 'inactive')
    .optional(),
}).min(1);

export const idParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
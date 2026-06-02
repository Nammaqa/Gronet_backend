import Joi from 'joi';

export const joinGroupSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
});

export const handleRequestSchema = Joi.object({
  memberId: Joi.string().uuid().required(),
});

export const leaveGroupSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
});
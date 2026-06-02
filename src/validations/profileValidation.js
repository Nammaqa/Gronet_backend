import Joi from 'joi';

export const updateProfileSchema =
  Joi.object({
    displayName: Joi.string()
      .trim()
      .optional(),

    headline: Joi.string()
      .trim()
      .optional()
      .allow('', null),

    designation: Joi.string()
      .trim()
      .optional()
      .allow('', null),

    bio: Joi.string()
      .trim()
      .optional()
      .allow('', null),

    location: Joi.string()
      .trim()
      .optional()
      .allow('', null),

    avatar: Joi.string()
      .uri()
      .optional()
      .allow('', null),

    coverPhoto: Joi.string()
      .uri()
      .optional()
      .allow('', null),

    github: Joi.string()
      .uri()
      .optional()
      .allow('', null),

    linkedin: Joi.string()
      .uri()
      .optional()
      .allow('', null),

    portfolio: Joi.string()
      .uri()
      .optional()
      .allow('', null),

    skills: Joi.array()
      .items(Joi.string())
      .optional(),
  });


export const userIdParamSchema =
  Joi.object({
    userId: Joi.string()
      .uuid()
      .required(),
  });
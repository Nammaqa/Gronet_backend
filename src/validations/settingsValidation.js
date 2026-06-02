import Joi from 'joi';

export const updateSettingsSchema =
  Joi.object({
    emailNotifications:
      Joi.boolean().optional(),

    pushNotifications:
      Joi.boolean().optional(),

    profileVisibility:
      Joi.string()
        .valid(
          'public',
          'private'
        )
        .optional(),

    showEmail:
      Joi.boolean().optional(),

    showConnections:
      Joi.boolean().optional(),

    darkMode:
      Joi.boolean().optional(),
  });
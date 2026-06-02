import { UserSettings } from '../models/index.js';

const error = (message, status = 400) => {
  const e = new Error(message);
  e.status = status;
  return e;
};


export const createDefaultSettings =
  async (userId) => {
    const settings =
      await UserSettings.create({
        userId,
      });

    return settings;
  };


export const getSettings = async (
  userId
) => {
  let settings =
    await UserSettings.findOne({
      where: { userId },
    });


  if (!settings) {
    settings =
      await createDefaultSettings(
        userId
      );
  }

  return settings;
};


export const updateSettings =
  async (userId, data) => {
    let settings =
      await UserSettings.findOne({
        where: { userId },
      });


    if (!settings) {
      settings =
        await createDefaultSettings(
          userId
        );
    }


    const allowedFields = [
      'emailNotifications',

      'pushNotifications',

      'profileVisibility',

      'showEmail',

      'showConnections',

      'darkMode',
    ];

    const filteredData = {};

    for (const field of allowedFields) {
      if (
        data[field] !== undefined
      ) {
        filteredData[field] =
          data[field];
      }
    }

    await settings.update(
      filteredData
    );

    return settings;
  };
import * as settingsService from '../services/settingsService.js';


export const getSettingsController =
  async (req, res) => {
    try {
      const settings =
        await settingsService.getSettings(
          req.user.id
        );

      return res.json({
        success: true,
        data: settings,
      });

    } catch (error) {
      console.error(
        'GET SETTINGS ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,

        message:
          error.message ||
          'Failed to fetch settings',
      });
    }
  };


export const updateSettingsController =
  async (req, res) => {
    try {
      const settings =
        await settingsService.updateSettings(
          req.user.id,
          req.body
        );

      return res.json({
        success: true,

        message:
          'Settings updated successfully',

        data: settings,
      });

    } catch (error) {
      console.error(
        'UPDATE SETTINGS ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,

        message:
          error.message ||
          'Failed to update settings',
      });
    }
  };
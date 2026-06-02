import * as service from '../services/notificationService.js';

export const getNotificationsController = async (
  req,
  res
) => {
  try {
    const { page = 1, limit = 20 } =
      req.query;

    const result =
      await service.getNotifications(
        req.user.id,
        parseInt(page),
        parseInt(limit)
      );

    return res.json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error(
      'GET NOTIFICATIONS ERROR:',
      error
    );

    return res.status(
      error.status || 500
    ).json({
      success: false,
      message:
        error.message ||
        'Internal server error',
    });
  }
};

/* =========================
   GET UNREAD COUNT
========================= */

export const getUnreadCountController = async (
  req,
  res
) => {
  try {
    const result =
      await service.getUnreadCount(
        req.user.id
      );

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error(
      'GET UNREAD COUNT ERROR:',
      error
    );

    return res.status(
      error.status || 500
    ).json({
      success: false,
      message:
        error.message ||
        'Internal server error',
    });
  }
};

/* =========================
   MARK SINGLE READ
========================= */

export const markAsReadController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const result =
      await service.markAsRead(
        id,
        req.user.id
      );

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error(
      'MARK NOTIFICATION READ ERROR:',
      error
    );

    return res.status(
      error.status || 500
    ).json({
      success: false,
      message:
        error.message ||
        'Internal server error',
    });
  }
};

/* =========================
   MARK ALL READ
========================= */

export const markAllAsReadController = async (
  req,
  res
) => {
  try {
    const result =
      await service.markAllAsRead(
        req.user.id
      );

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error(
      'MARK ALL READ ERROR:',
      error
    );

    return res.status(
      error.status || 500
    ).json({
      success: false,
      message:
        error.message ||
        'Internal server error',
    });
  }
};
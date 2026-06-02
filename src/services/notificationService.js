import { Notification } from '../models/index.js';
import { getIO } from '../socket/socket.js';

const error = (message, status = 400) => {
  const e = new Error(message);
  e.status = status;
  return e;
};

/* =========================
   CREATE NOTIFICATION
========================= */

export const createNotification = async ({
  userId,
  type,
  title,
  message,
  referenceId = null,
}) => {
  const notification = await Notification.create({
    userId,
    type,
    title,
    message,
    referenceId,
  });

  /* =========================
     REALTIME SOCKET EMIT
  ========================= */

  try {
    const io = getIO();

    io.to(userId).emit(
      'notification:new',
      notification
    );

  } catch (socketError) {
    console.error(
      'NOTIFICATION SOCKET ERROR:',
      socketError
    );
  }

  return notification;
};

/* =========================
   GET NOTIFICATIONS
========================= */

export const getNotifications = async (
  userId,
  page = 1,
  limit = 20
) => {
  const offset = (page - 1) * limit;

  const { count, rows } =
    await Notification.findAndCountAll({
      where: { userId },

      order: [['createdAt', 'DESC']],

      limit,
      offset,
    });

  return {
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
    data: rows,
  };
};

/* =========================
   GET UNREAD COUNT
========================= */

export const getUnreadCount = async (
  userId
) => {
  const count = await Notification.count({
    where: {
      userId,
      isRead: false,
    },
  });

  return {
    unreadCount: count,
  };
};

/* =========================
   MARK SINGLE READ
========================= */

export const markAsRead = async (
  notificationId,
  userId
) => {
  const notification =
    await Notification.findByPk(notificationId);

  if (!notification) {
    throw error(
      'Notification not found',
      404
    );
  }

  if (notification.userId !== userId) {
    throw error('Unauthorized', 403);
  }

  notification.isRead = true;

  await notification.save();

  return notification;
};

/* =========================
   MARK ALL READ
========================= */

export const markAllAsRead = async (
  userId
) => {
  await Notification.update(
    { isRead: true },
    {
      where: {
        userId,
        isRead: false,
      },
    }
  );

  return {
    message:
      'All notifications marked as read',
  };
};
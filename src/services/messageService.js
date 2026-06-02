import { Op } from 'sequelize';

import { Message, User } from '../models/index.js';

import { getIO } from '../socket/socket.js';

import { createNotification } from './notificationService.js';

const error = (message, status = 400) => {
  const e = new Error(message);
  e.status = status;
  return e;
};

/* =========================
   SEND MESSAGE
========================= */

export const sendMessage = async (
  senderId,
  recipientId,
  content
) => {
  /* =========================
     VALIDATIONS
  ========================= */

  if (senderId === recipientId) {
    throw error('Cannot message yourself');
  }

  if (!content || !content.trim()) {
    throw error('Message content required');
  }

  /* =========================
     CHECK RECIPIENT
  ========================= */

  const recipient = await User.findByPk(recipientId);

  if (!recipient) {
    throw error('Recipient user not found', 404);
  }

  /* =========================
     CREATE MESSAGE
  ========================= */

  const message = await Message.create({
    senderId,
    recipientId,
    content: content.trim(),
  });

  /* =========================
     REALTIME MESSAGE EMIT
  ========================= */

  try {
    const io = getIO();

    io.to(recipientId).emit('message:new', {
      id: message.id,
      senderId: message.senderId,
      recipientId: message.recipientId,
      content: message.content,
      isRead: message.isRead,
      createdAt: message.createdAt,
    });

  } catch (socketError) {
    console.error(
      'MESSAGE SOCKET ERROR:',
      socketError
    );
  }

  /* =========================
     CREATE NOTIFICATION
  ========================= */

  try {
    await createNotification({
      userId: recipientId,
      type: 'message',
      title: 'New Message',
      message: 'You received a new message',
      referenceId: message.id,
    });

  } catch (notificationError) {
    console.error(
      'NOTIFICATION ERROR:',
      notificationError
    );
  }

  return message;
};

/* =========================
   GET CONVERSATION
========================= */

export const getConversation = async (
  currentUserId,
  otherUserId,
  page = 1,
  limit = 20
) => {
  const offset = (page - 1) * limit;

  const { count, rows } =
    await Message.findAndCountAll({
      where: {
        [Op.or]: [
          {
            senderId: currentUserId,
            recipientId: otherUserId,
          },
          {
            senderId: otherUserId,
            recipientId: currentUserId,
          },
        ],
      },

      include: [
        {
          model: User,
          as: 'sender',
          attributes: [
            'id',
            'displayName',
            'avatar',
          ],
        },
        {
          model: User,
          as: 'recipient',
          attributes: [
            'id',
            'displayName',
            'avatar',
          ],
        },
      ],

      order: [['createdAt', 'ASC']],

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
   GET ALL CONVERSATIONS
========================= */

export const getConversations = async (
  userId
) => {
  const messages = await Message.findAll({
    where: {
      [Op.or]: [
        { senderId: userId },
        { recipientId: userId },
      ],
    },

    include: [
      {
        model: User,
        as: 'sender',
        attributes: [
          'id',
          'displayName',
          'avatar',
        ],
      },
      {
        model: User,
        as: 'recipient',
        attributes: [
          'id',
          'displayName',
          'avatar',
        ],
      },
    ],

    order: [['createdAt', 'DESC']],
  });

  const map = new Map();

  for (const msg of messages) {
    const otherUser =
      msg.senderId === userId
        ? msg.recipient
        : msg.sender;

    if (!otherUser) {
      continue;
    }

    if (!map.has(otherUser.id)) {
      map.set(otherUser.id, {
        user: otherUser,
        lastMessage: msg,
      });
    }
  }

  return Array.from(map.values());
};

export const markConversationAsRead =
  async (
    currentUserId,
    otherUserId
  ) => {
    await Message.update(
      { isRead: true },
      {
        where: {
          senderId: otherUserId,
          recipientId: currentUserId,
          isRead: false,
        },
      }
    );

    return {
      message:
        'Conversation marked as read',
    };
  };

export const getUnreadCount = async (
  userId
) => {
  const count = await Message.count({
    where: {
      recipientId: userId,
      isRead: false,
    },
  });

  return {
    unreadCount: count,
  };
};

export const editMessage = async (
  messageId,
  userId,
  content
) => {

  if (!content || !content.trim()) {
    throw error('Message content required');
  }

  const message = await Message.findByPk(
    messageId
  );

  if (!message) {
    throw error('Message not found', 404);
  }

  if (message.senderId !== userId) {
    throw error('Unauthorized', 403);
  }

  message.content = content.trim();

  await message.save();

  return message;
};
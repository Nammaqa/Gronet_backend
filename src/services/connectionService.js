import { Op } from 'sequelize';

import { Connection, User } from '../models/index.js';

import { createNotification } from './notificationService.js';

const error = (message, status = 400) => {
  const e = new Error(message);
  e.status = status;
  return e;
};

/* =========================
   SEND CONNECTION REQUEST
========================= */

export const sendConnectionRequest = async (
  senderId,
  recipientId
) => {
  /* =========================
     VALIDATION
  ========================= */

  if (senderId === recipientId) {
    throw error(
      'Cannot connect with yourself'
    );
  }

  /* =========================
     CHECK USER EXISTS
  ========================= */

  const recipient = await User.findByPk(
    recipientId
  );

  if (!recipient) {
    throw error(
      'Recipient user not found',
      404
    );
  }

  /* =========================
     CHECK EXISTING CONNECTION
  ========================= */

  const existing = await Connection.findOne({
    where: {
      [Op.or]: [
        { senderId, recipientId },
        {
          senderId: recipientId,
          recipientId: senderId,
        },
      ],
    },
  });

  if (existing) {
    throw error(
      'Connection already exists or pending'
    );
  }

  /* =========================
     CREATE CONNECTION
  ========================= */

  const connection = await Connection.create({
    senderId,
    recipientId,
    status: 'pending',
  });

  /* =========================
     CREATE NOTIFICATION
  ========================= */

  try {
    await createNotification({
      userId: recipientId,

      type: 'connection_request',

      title: 'New Connection Request',

      message:
        'You received a new connection request',

      referenceId: connection.id,
    });

  } catch (notificationError) {
    console.error(
      'CONNECTION REQUEST NOTIFICATION ERROR:',
      notificationError
    );
  }

  return {
    id: connection.id,
    senderId: connection.senderId,
    recipientId: connection.recipientId,
    status: connection.status,
  };
};

/* =========================
   ACCEPT CONNECTION REQUEST
========================= */

export const acceptConnectionRequest =
  async (userId, requestId) => {
    const connection =
      await Connection.findByPk(requestId);

    if (!connection) {
      throw error('Request not found', 404);
    }

    if (connection.recipientId !== userId) {
      throw error('Not authorized', 403);
    }

    if (connection.status !== 'pending') {
      throw error(
        'Request already handled'
      );
    }

    /* =========================
       UPDATE STATUS
    ========================= */

    connection.status = 'accepted';

    await connection.save();

    /* =========================
       CREATE NOTIFICATION
    ========================= */

    try {
      await createNotification({
        userId: connection.senderId,

        type: 'connection_accepted',

        title: 'Connection Accepted',

        message:
          'Your connection request was accepted',

        referenceId: connection.id,
      });

    } catch (notificationError) {
      console.error(
        'CONNECTION ACCEPT NOTIFICATION ERROR:',
        notificationError
      );
    }

    return {
      id: connection.id,
      status: connection.status,
    };
  };

/* =========================
   REJECT CONNECTION REQUEST
========================= */

export const rejectConnectionRequest =
  async (userId, requestId) => {
    const connection =
      await Connection.findByPk(requestId);

    if (!connection) {
      throw error('Request not found', 404);
    }

    if (connection.recipientId !== userId) {
      throw error('Not authorized', 403);
    }

    if (connection.status !== 'pending') {
      throw error(
        'Request already handled'
      );
    }

    connection.status = 'rejected';

    await connection.save();

    return {
      id: connection.id,
      status: connection.status,
    };
  };

/* =========================
   GET CONNECTIONS
========================= */

export const getConnections = async (
  userId
) => {
  const connections =
    await Connection.findAll({
      where: {
        status: 'accepted',

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

      order: [['updatedAt', 'DESC']],
    });

  return connections;
};

/* =========================
   GET PENDING REQUESTS
========================= */

export const getPendingRequests = async (
  userId
) => {
  const requests =
    await Connection.findAll({
      where: {
        recipientId: userId,
        status: 'pending',
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
      ],

      order: [['createdAt', 'DESC']],
    });

  return requests;
};
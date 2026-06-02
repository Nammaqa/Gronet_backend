import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Message = sequelize.define(
    'Message',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      recipientId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'Messages',

      timestamps: true,

      indexes: [
        {
          fields: ['senderId'],
        },
        {
          fields: ['recipientId'],
        },
        {
          fields: ['createdAt'],
        },
      ],
    }
  );

  return Message;
};
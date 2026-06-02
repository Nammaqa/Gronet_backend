import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Connection = sequelize.define(
    'Connection',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      recipientId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
      },
    },
    {
      tableName: 'Connections',
      timestamps: true,

      indexes: [
        {
          unique: true,
          fields: ['senderId', 'recipientId'],
        },
      ],

      validate: {
        notSelfConnection() {
          if (this.senderId === this.recipientId) {
            throw new Error('Cannot connect with yourself');
          }
        },
      },
    }
  );

  return Connection;
};
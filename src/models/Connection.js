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
        type: DataTypes.STRING,
        defaultValue: 'Pending',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'Connections',
      timestamps: true,
      underscored: false,
      indexes: [
        {
          unique: true,
          fields: ['senderId', 'recipientId'],
        },
      ],
    }
  );

  return Connection;
};

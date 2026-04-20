import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const UserInterest = sequelize.define(
    'UserInterest',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      interestId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'UserInterests',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'interestId'],
        },
      ],
    }
  );

  return UserInterest;
};
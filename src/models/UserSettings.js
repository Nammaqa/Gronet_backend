import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const UserSettings = sequelize.define(
    'UserSettings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      emailNotifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      pushNotifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      privacyLevel: {
        type: DataTypes.STRING,
        defaultValue: 'public',
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
      tableName: 'UserSettings',
      timestamps: true,
      underscored: false,
    }
  );

  return UserSettings;
};

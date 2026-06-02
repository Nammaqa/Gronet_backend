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


      profileVisibility: {
        type: DataTypes.ENUM(
          'public',
          'private'
        ),

        defaultValue: 'public',
      },

      showEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      showConnections: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },


      darkMode: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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

      indexes: [
        {
          unique: true,
          fields: ['userId'],
        },
      ],
    }
  );

  return UserSettings;
};
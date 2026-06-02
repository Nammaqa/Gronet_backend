import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      enquiryID: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },

      userID: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      headline: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      coverPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      github: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      portfolio: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      skills: {
        type: DataTypes.JSON,
        defaultValue: [],
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
      tableName: 'Users',

      timestamps: true,

      indexes: [
        {
          fields: ['email'],
        },

        {
          fields: ['userID'],
        },

        {
          fields: ['displayName'],
        },
      ],
    }
  );

  return User;
};
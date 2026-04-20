import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Discussion = sequelize.define(
    'Discussion',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      groupId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      coverImage: {
        type: DataTypes.STRING,
      },

      images: {
        type: DataTypes.JSON,
        defaultValue: [],
      },

      tags: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },

      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      isDraft: {
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
      tableName: 'Discussions',
      timestamps: true,
    }
  );

  return Discussion;
};
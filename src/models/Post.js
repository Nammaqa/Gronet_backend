import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Post = sequelize.define(
    'Post',
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
        allowNull: true,
      },

      images: {
        type: DataTypes.JSON,
        defaultValue: [],
      },

      community: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      industry: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      tags: {
        type: DataTypes.JSON,
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
      tableName: 'Posts',
      timestamps: true,
    }
  );

  return Post;
};
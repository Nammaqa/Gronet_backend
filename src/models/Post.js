import { DataTypes } from 'sequelize';
import { nanoid } from 'nanoid';

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

      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'Posts',
      timestamps: true,

      hooks: {
        beforeValidate: (post) => {
          if (!post.slug) {
            post.slug = nanoid(8);
          }
        },
      },
    }
  );

  return Post;
};

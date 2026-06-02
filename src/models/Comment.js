import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Comment = sequelize.define(
    'Comment',
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

      contentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      contentType: {
        type: DataTypes.ENUM(
          'post',
          'discussion',
          'article'
        ),
        allowNull: false,
      },

      parentId: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
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
      tableName: 'Comments',

      timestamps: true,

      indexes: [
        {
          fields: ['contentId'],
        },
        {
          fields: ['contentType'],
        },
        {
          fields: ['authorId'],
        },
      ],
    }
  );

  return Comment;
};
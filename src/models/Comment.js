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
      postId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      discussionId: {
        type: DataTypes.UUID,
        allowNull: true,
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
      underscored: false,
    }
  );

  return Comment;
};

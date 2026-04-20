import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const DiscussionReply = sequelize.define(
    'DiscussionReply',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      discussionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      parentReplyId: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      content: {
        type: DataTypes.TEXT,
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
      tableName: 'DiscussionReplies',
      timestamps: true,
    }
  );

  return DiscussionReply;
};
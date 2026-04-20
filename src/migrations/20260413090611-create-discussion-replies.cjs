'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DiscussionReplies', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      discussionId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      authorId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      parentReplyId: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('DiscussionReplies');
  },
};
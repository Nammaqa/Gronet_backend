'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      senderId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      recipientId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('Messages', ['senderId']);

    await queryInterface.addIndex('Messages', ['recipientId']);

    await queryInterface.addIndex('Messages', ['createdAt']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Messages');
  },
};
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      type: {
        type: Sequelize.ENUM(
          'message',
          'connection_request',
          'connection_accepted',
          'post_like',
          'comment'
        ),
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      referenceId: {
        type: Sequelize.UUID,
        allowNull: true,
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

    /* =========================
       INDEXES
    ========================= */

    await queryInterface.addIndex(
      'Notifications',
      ['userId']
    );

    await queryInterface.addIndex(
      'Notifications',
      ['isRead']
    );

    await queryInterface.addIndex(
      'Notifications',
      ['createdAt']
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Notifications');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Notifications_type";'
    );
  },
};
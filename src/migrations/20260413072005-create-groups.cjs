'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Groups', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      about: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      industry: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      guidelines: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      type: {
        type: Sequelize.ENUM('public', 'private'),
        defaultValue: 'public',
      },

      createdBy: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Groups');
  },
};
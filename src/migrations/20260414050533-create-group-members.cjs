'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GroupMembers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      groupId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      role: {
        type: Sequelize.ENUM('admin', 'member'),
        defaultValue: 'member',
    },

      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.addConstraint('GroupMembers', {
      fields: ['userId', 'groupId'],
      type: 'unique',
      name: 'unique_user_group',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('GroupMembers');
  },
};
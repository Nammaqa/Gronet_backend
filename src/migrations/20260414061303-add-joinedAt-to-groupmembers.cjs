'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('GroupMembers', 'joinedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('GroupMembers', 'joinedAt');
  },
};
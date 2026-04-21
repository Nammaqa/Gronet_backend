'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'designation', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'coverPhoto', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'skills', {
      type: Sequelize.JSON,
      defaultValue: [],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'designation');
    await queryInterface.removeColumn('Users', 'coverPhoto');
    await queryInterface.removeColumn('Users', 'skills');
  },
};
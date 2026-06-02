'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      'Users',
      'headline',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

    await queryInterface.addColumn(
      'Users',
      'location',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

    await queryInterface.addColumn(
      'Users',
      'github',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

    await queryInterface.addColumn(
      'Users',
      'linkedin',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

    await queryInterface.addColumn(
      'Users',
      'portfolio',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },

  async down(queryInterface) {

    await queryInterface.removeColumn(
      'Users',
      'headline'
    );

    await queryInterface.removeColumn(
      'Users',
      'location'
    );

    await queryInterface.removeColumn(
      'Users',
      'github'
    );

    await queryInterface.removeColumn(
      'Users',
      'linkedin'
    );

    await queryInterface.removeColumn(
      'Users',
      'portfolio'
    );
  },
};
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Discussions',
      'images',
      {
        type: Sequelize.JSON,
        defaultValue: [],
      }
    );

    await queryInterface.addColumn(
      'Discussions',
      'slug',
      {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'Discussions',
      'images'
    );

    await queryInterface.removeColumn(
      'Discussions',
      'slug'
    );
  },
};
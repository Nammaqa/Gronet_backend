'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Articles',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },

        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        authorId: {
          type: Sequelize.UUID,
          allowNull: false,
        },

        category: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        tags: {
          type: Sequelize.JSON,
          defaultValue: [],
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      }
    );

    await queryInterface.addIndex(
      'Articles',
      ['authorId']
    );

    await queryInterface.addIndex(
      'Articles',
      ['createdAt']
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      'Articles'
    );
  },
};
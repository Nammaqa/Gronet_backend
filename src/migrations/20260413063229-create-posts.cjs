'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      authorId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      coverImage: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      community: {
        type: Sequelize.STRING,
      },
      industry: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isDraft: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Posts');
  },
};
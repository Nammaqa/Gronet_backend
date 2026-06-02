'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Comments',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },

        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        contentId: {
          type: Sequelize.UUID,
          allowNull: false,
        },

        contentType: {
          type: Sequelize.ENUM(
            'post',
            'discussion',
            'article'
          ),
          allowNull: false,
        },

        parentId: {
          type: Sequelize.UUID,
          allowNull: true,
        },

        authorId: {
          type: Sequelize.UUID,
          allowNull: false,
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
      'Comments',
      ['contentId']
    );

    await queryInterface.addIndex(
      'Comments',
      ['contentType']
    );

    await queryInterface.addIndex(
      'Comments',
      ['authorId']
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      'Comments'
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Comments_contentType";'
    );
  },
};
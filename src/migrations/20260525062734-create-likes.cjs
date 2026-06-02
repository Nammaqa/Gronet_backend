'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.UUID,
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

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    /* =========================
       UNIQUE INDEX
    ========================= */

    await queryInterface.addConstraint(
      'Likes',
      {
        fields: [
          'userId',
          'contentId',
          'contentType',
        ],

        type: 'unique',

        name: 'unique_like_constraint',
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Likes');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Likes_contentType";'
    );
  },
};
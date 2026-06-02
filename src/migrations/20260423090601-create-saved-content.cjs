'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SavedContents', {
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
        type: Sequelize.ENUM('post', 'discussion', 'article'),
        allowNull: false,
      },

      savedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addConstraint('SavedContents', {
      fields: ['userId', 'contentId', 'contentType'],
      type: 'unique',
      name: 'unique_saved_content',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SavedContents');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_SavedContents_contentType";'
    );
  },
};
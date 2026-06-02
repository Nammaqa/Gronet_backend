'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'UserSettings',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },

        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          unique: true,
        },


        emailNotifications: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },

        pushNotifications: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },


        profileVisibility: {
          type: Sequelize.ENUM(
            'public',
            'private'
          ),

          defaultValue: 'public',
        },

        showEmail: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },

        showConnections: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },

        darkMode: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
      'UserSettings',
      ['userId'],
      {
        unique: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      'UserSettings'
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_UserSettings_profileVisibility";'
    );
  },
};
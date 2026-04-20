module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      enquiryID: Sequelize.STRING,
      userID: Sequelize.STRING,
      email: Sequelize.STRING,
      displayName: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('Interests', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      category: Sequelize.STRING,
    });

    await queryInterface.createTable('UserInterests', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      interestId: {
        type: Sequelize.UUID,
        references: { model: 'Interests', key: 'id' },
        onDelete: 'CASCADE',
      },
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserInterests');
    await queryInterface.dropTable('Interests');
    await queryInterface.dropTable('Users');
  },
};
export default {
  async up(queryInterface, Sequelize) {
    // Create a temporary column
    await queryInterface.addColumn('Users', 'userID_temp', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Copy data from userID to userID_temp (if possible)
    await queryInterface.sequelize.query(
      'UPDATE "Users" SET "userID_temp" = CAST("userID" AS INTEGER) WHERE "userID" ~ \'^[0-9]+$\''
    );

    // Remove the original column
    await queryInterface.removeColumn('Users', 'userID');

    // Rename the temporary column to userID
    await queryInterface.renameColumn('Users', 'userID_temp', 'userID');

    // Add constraints to the new column
    await queryInterface.changeColumn('Users', 'userID', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert userID to STRING
    await queryInterface.changeColumn('Users', 'userID', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};

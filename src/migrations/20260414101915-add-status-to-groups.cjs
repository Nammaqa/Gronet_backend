'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Groups_status') THEN
          CREATE TYPE "enum_Groups_status" AS ENUM ('active', 'inactive', 'pending');
        END IF;
      END$$;
    `);

    await queryInterface.addColumn('Groups', 'status', {
      type: Sequelize.ENUM('active', 'inactive', 'pending'),
      allowNull: false,
      defaultValue: 'active',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Groups', 'status');
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_Groups_status";
    `);
  },
};
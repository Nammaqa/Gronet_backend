import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Group = sequelize.define(
    'Group',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      about: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      industry: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      guidelines: {
        type: DataTypes.TEXT,
      },

      type: {
        type: DataTypes.ENUM('public', 'private'),
        defaultValue: 'public',
      },

      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
      },

      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: 'Groups',
      timestamps: true,
    }
  );

  return Group;
};
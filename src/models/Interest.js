import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Interest = sequelize.define(
    'Interest',
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

      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Interests',
      timestamps: false,
    }
  );

  return Interest;
};
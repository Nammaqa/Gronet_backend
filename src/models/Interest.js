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
      category: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      tableName: 'Interests',
      timestamps: false,
      underscored: false,
    }
  );

  return Interest;
};

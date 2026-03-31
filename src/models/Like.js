import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Like = sequelize.define(
    'Like',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'Likes',
      timestamps: false,
      underscored: false,
      indexes: [
        {
          unique: true,
          fields: ['postId', 'userId'],
        },
      ],
    }
  );

  return Like;
};

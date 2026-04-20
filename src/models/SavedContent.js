import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const SavedContent = sequelize.define(
    'SavedContent',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      savedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'SavedContents',
      timestamps: false,
      underscored: false,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'postId'],
        },
        {
          unique: true,
          fields: ['userId', 'articleId'],
        },
      ],
    }
  );

  return SavedContent;
};

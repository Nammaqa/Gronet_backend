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

      contentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      contentType: {
        type: DataTypes.ENUM('post', 'discussion', 'article'),
        allowNull: false,
      },

      savedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'SavedContents',
      timestamps: false,

      indexes: [
        {
          unique: true,
          fields: ['userId', 'contentId', 'contentType'],
        },
      ],
    }
  );

  return SavedContent;
};
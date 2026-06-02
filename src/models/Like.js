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

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      contentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      contentType: {
        type: DataTypes.ENUM(
          'post',
          'discussion',
          'article'
        ),
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

      indexes: [
        {
          unique: true,

          fields: [
            'userId',
            'contentId',
            'contentType',
          ],
        },
      ],
    }
  );

  return Like;
};
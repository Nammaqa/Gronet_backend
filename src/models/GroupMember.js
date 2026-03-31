import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const GroupMember = sequelize.define(
    'GroupMember',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('member', 'moderator', 'admin'),
        defaultValue: 'member',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'GroupMembers',
      timestamps: false,
      underscored: false,
      indexes: [
        {
          unique: true,
          fields: ['groupId', 'userId'],
        },
      ],
    }
  );

  return GroupMember;
};

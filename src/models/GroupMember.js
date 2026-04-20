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
        type: DataTypes.ENUM('admin', 'member'),
        defaultValue: 'member',
      },

      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },
    },
    {
      tableName: 'GroupMembers',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['groupId', 'userId'],
        },
      ],
      hooks: {
        beforeCreate: (member) => {
          if (member.role === 'admin') {
            member.status = 'approved';
          }
        },
      },
    }
  );

  return GroupMember;
};
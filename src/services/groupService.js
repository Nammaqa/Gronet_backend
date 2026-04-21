// import { Group, GroupMember } from '../models/index.js';

// export const createGroup = async (userId, data) => {
//   try {
//     const group = await Group.create({
//       ...data,
//       createdBy: userId,
//       status: 'active',
//     });

//     if (!group || !group.id) {
//       throw new Error('Group creation failed');
//     }

//     await GroupMember.create({
//       userId,
//       groupId: group.id,
//       role: 'admin',
//       status: 'approved',
//     });

//     return group;

//   } catch (error) {
//     console.error('createGroup failed:', error);
//     throw error;
//   }
// };

// export const getAllGroups = async () => {
//   try {
//     return await Group.findAll({
//       order: [['createdAt', 'DESC']],
//     });
//   } catch (error) {
//     console.error('getAllGroups failed:', error.message);
//     throw new Error('Failed to fetch groups');
//   }
// };

// export const getGroupById = async (id) => {
//   try {
//     const group = await Group.findByPk(id);

//     if (!group) {
//       throw new Error('Group not found');
//     }

//     return group;

//   } catch (error) {
//     console.error('getGroupById failed:', error.message);
//     throw error;
//   }
// };




import { Group, GroupMember } from '../models/index.js';

export const createGroup = async (userId, data) => {
  const t = await Group.sequelize.transaction();

  try {
    const group = await Group.create(
      {
        ...data,
        createdBy: userId,
        status: 'active',
      },
      { transaction: t }
    );

    if (!group || !group.id) {
      throw new Error('Group creation failed');
    }

    await GroupMember.create(
      {
        userId,
        groupId: group.id,
        role: 'admin',
        status: 'approved',
      },
      { transaction: t }
    );

    await t.commit();
    return group;

  } catch (error) {
    await t.rollback();

    console.error('createGroup failed:', error);

    throw {
      message: 'Group creation failed',
      originalError: error.message,
      status: 500,
    };
  }
};


export const getAllGroups = async () => {
  try {
    const groups = await Group.findAll({
      order: [['createdAt', 'DESC']],
    });

    return groups;

  } catch (error) {
    console.error('getAllGroups failed:', error);

    throw {
      message: 'Failed to fetch groups',
      originalError: error.message,
      status: 500,
    };
  }
};


export const getGroupById = async (id) => {
  try {
    const group = await Group.findByPk(id);

    if (!group) {
      throw {
        message: 'Group not found',
        status: 404,
      };
    }

    return group;

  } catch (error) {
    console.error('getGroupById failed:', error);

    throw {
      message: error.message || 'Failed to fetch group',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};
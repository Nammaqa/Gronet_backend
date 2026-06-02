import {
  Group,
  GroupMember,
} from '../models/index.js';

export const createGroup = async (
  userId,
  data
) => {
  const t =
    await Group.sequelize.transaction();

  try {
    const group = await Group.create(
      {
        ...data,
        createdBy: userId,
        status: 'active',
      },
      {
        transaction: t,
      }
    );

    await GroupMember.create(
      {
        userId,
        groupId: group.id,
        role: 'admin',
        status: 'approved',
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    return group;

  } catch (err) {
    await t.rollback();

    const error = new Error(
      'Group creation failed'
    );

    error.status = 500;

    throw error;
  }
};

export const getAllGroups =
  async () => {
    return await Group.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  };

export const getGroupById =
  async (id) => {
    const group =
      await Group.findByPk(id);

    if (!group) {
      const error = new Error(
        'Group not found'
      );

      error.status = 404;

      throw error;
    }

    return group;
  };

export const updateGroup =
  async (
    id,
    userId,
    data
  ) => {
    const group =
      await Group.findByPk(id);

    if (!group) {
      const error = new Error(
        'Group not found'
      );

      error.status = 404;

      throw error;
    }

    if (
      group.createdBy !== userId
    ) {
      const error = new Error(
        'Unauthorized'
      );

      error.status = 403;

      throw error;
    }

    const allowedFields = [
      'name',
      'about',
      'industry',
      'guidelines',
      'type',
      'status',
    ];

    const filteredData = {};

    for (const field of allowedFields) {
      if (
        data[field] !== undefined
      ) {
        filteredData[field] =
          data[field];
      }
    }

    await group.update(
      filteredData
    );

    return group;
  };

  export const deleteGroup = async (
  id,
  userId
) => {
  const group =
    await Group.findByPk(id);

  if (!group) {
    const error = new Error(
      'Group not found'
    );

    error.status = 404;

    throw error;
  }

  if (
    group.createdBy !== userId
  ) {
    const error = new Error(
      'Unauthorized'
    );

    error.status = 403;

    throw error;
  }

  await GroupMember.destroy({
    where: {
      groupId: id,
    },
  });

  await group.destroy();

  return {
    message:
      'Group deleted successfully',
  };
};
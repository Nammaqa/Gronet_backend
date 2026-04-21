// import { Group, GroupMember } from '../models/index.js';

// export const joinGroup = async (userId, groupId) => {
//   const group = await Group.findByPk(groupId);
//   if (!group) throw new Error('Group not found');

//   const existing = await GroupMember.findOne({
//     where: { userId, groupId },
//   });

//   if (existing) {
//     throw new Error('Already joined');
//   }

//   return await GroupMember.create({
//     userId,
//     groupId,
//     role: 'member',
//     status: 'approved',
//   });
// };

// export const approveRequest = async (adminId, memberId) => {
//   const member = await GroupMember.findByPk(memberId);
//   if (!member) throw new Error('Request not found');

//   const admin = await GroupMember.findOne({
//     where: {
//       userId: adminId,
//       groupId: member.groupId,
//       role: 'admin',
//       status: 'approved',
//     },
//   });

//   if (!admin) throw new Error('Not authorized');

//   member.status = 'approved';
//   await member.save();

//   return member;
// };

// export const rejectRequest = async (adminId, memberId) => {
//   const member = await GroupMember.findByPk(memberId);
//   if (!member) throw new Error('Request not found');

//   const admin = await GroupMember.findOne({
//     where: {
//       userId: adminId,
//       groupId: member.groupId,
//       role: 'admin',
//       status: 'approved',
//     },
//   });

//   if (!admin) throw new Error('Not authorized');

//   member.status = 'rejected';
//   await member.save();

//   return member;
// };

// export const leaveGroup = async (userId, groupId) => {
//   const member = await GroupMember.findOne({
//     where: { userId, groupId },
//   });

//   if (!member) throw new Error('Not a member');

//   await member.destroy();
// };




import { Group, GroupMember } from '../models/index.js';

export const joinGroup = async (userId, groupId) => {
  try {
    const group = await Group.findByPk(groupId);

    if (!group) {
      throw {
        message: 'Group not found',
        status: 404,
      };
    }

    const existing = await GroupMember.findOne({
      where: { userId, groupId },
    });

    if (existing) {
      throw {
        message: 'Already joined',
        status: 400,
      };
    }

    const member = await GroupMember.create({
      userId,
      groupId,
      role: 'member',
      status: 'approved',
    });

    return member;

  } catch (error) {
    console.error('joinGroup failed:', error);

    throw {
      message: error.message || 'Failed to join group',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


export const approveRequest = async (adminId, memberId) => {
  try {
    const member = await GroupMember.findByPk(memberId);

    if (!member) {
      throw {
        message: 'Request not found',
        status: 404,
      };
    }

    const admin = await GroupMember.findOne({
      where: {
        userId: adminId,
        groupId: member.groupId,
        role: 'admin',
        status: 'approved',
      },
    });

    if (!admin) {
      throw {
        message: 'Not authorized',
        status: 403,
      };
    }

    member.status = 'approved';
    await member.save();

    return member;

  } catch (error) {
    console.error('approveRequest failed:', error);

    throw {
      message: error.message || 'Failed to approve request',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


export const rejectRequest = async (adminId, memberId) => {
  try {
    const member = await GroupMember.findByPk(memberId);

    if (!member) {
      throw {
        message: 'Request not found',
        status: 404,
      };
    }

    const admin = await GroupMember.findOne({
      where: {
        userId: adminId,
        groupId: member.groupId,
        role: 'admin',
        status: 'approved',
      },
    });

    if (!admin) {
      throw {
        message: 'Not authorized',
        status: 403,
      };
    }

    member.status = 'rejected';
    await member.save();

    return member;

  } catch (error) {
    console.error('rejectRequest failed:', error);

    throw {
      message: error.message || 'Failed to reject request',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};


export const leaveGroup = async (userId, groupId) => {
  try {
    const member = await GroupMember.findOne({
      where: { userId, groupId },
    });

    if (!member) {
      throw {
        message: 'Not a member',
        status: 404,
      };
    }

    await member.destroy();

    return { message: 'Left group successfully' };

  } catch (error) {
    console.error('leaveGroup failed:', error);

    throw {
      message: error.message || 'Failed to leave group',
      originalError: error.originalError || error.message,
      status: error.status || 500,
    };
  }
};
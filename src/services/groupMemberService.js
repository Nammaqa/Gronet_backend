import { Group, GroupMember } from '../models/index.js';

export const joinGroup = async (userId, groupId) => {
  const group = await Group.findByPk(groupId);

  if (!group) {
    const error = new Error('Group not found');
    error.status = 404;
    throw error;
  }

  const existing = await GroupMember.findOne({
    where: { userId, groupId },
  });

  if (existing) {
    const error = new Error('Already joined');
    error.status = 400;
    throw error;
  }

  return await GroupMember.create({
    userId,
    groupId,
    role: 'member',
    status: 'approved',
  });
};


export const approveRequest = async (adminId, memberId) => {
  const member = await GroupMember.findByPk(memberId);

  if (!member) {
    const error = new Error('Request not found');
    error.status = 404;
    throw error;
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
    const error = new Error('Not authorized');
    error.status = 403;
    throw error;
  }

  member.status = 'approved';
  await member.save();

  return member;
};


export const rejectRequest = async (adminId, memberId) => {
  const member = await GroupMember.findByPk(memberId);

  if (!member) {
    const error = new Error('Request not found');
    error.status = 404;
    throw error;
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
    const error = new Error('Not authorized');
    error.status = 403;
    throw error;
  }

  member.status = 'rejected';
  await member.save();

  return member;
};


export const leaveGroup = async (userId, groupId) => {
  const member = await GroupMember.findOne({
    where: { userId, groupId },
  });

  if (!member) {
    const error = new Error('Not a member');
    error.status = 404;
    throw error;
  }

  await member.destroy();

  return { message: 'Left group successfully' };
};
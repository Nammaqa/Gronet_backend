import { Group, GroupMember } from '../models/index.js';

export const joinGroup = async (userId, groupId) => {
  const group = await Group.findByPk(groupId);
  if (!group) throw new Error('Group not found');

  const existing = await GroupMember.findOne({
    where: { userId, groupId },
  });

  if (existing) {
    throw new Error('Already joined');
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
  if (!member) throw new Error('Request not found');

  const admin = await GroupMember.findOne({
    where: {
      userId: adminId,
      groupId: member.groupId,
      role: 'admin',
      status: 'approved',
    },
  });

  if (!admin) throw new Error('Not authorized');

  member.status = 'approved';
  await member.save();

  return member;
};

export const rejectRequest = async (adminId, memberId) => {
  const member = await GroupMember.findByPk(memberId);
  if (!member) throw new Error('Request not found');

  const admin = await GroupMember.findOne({
    where: {
      userId: adminId,
      groupId: member.groupId,
      role: 'admin',
      status: 'approved',
    },
  });

  if (!admin) throw new Error('Not authorized');

  member.status = 'rejected';
  await member.save();

  return member;
};

export const leaveGroup = async (userId, groupId) => {
  const member = await GroupMember.findOne({
    where: { userId, groupId },
  });

  if (!member) throw new Error('Not a member');

  await member.destroy();
};
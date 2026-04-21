import * as service from '../services/groupMemberService.js';

export const joinGroupController = async (req, res) => {
  try {
    const { groupId } = req.body;

    const result = await service.joinGroup(req.user.id, groupId);

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveRequestController = async (req, res) => {
  try {
    const { memberId } = req.body;

    const result = await service.approveRequest(req.user.id, memberId);

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectRequestController = async (req, res) => {
  try {
    const { memberId } = req.body;

    const result = await service.rejectRequest(req.user.id, memberId);

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const leaveGroupController = async (req, res) => {
  try {
    const { groupId } = req.body;

    await service.leaveGroup(req.user.id, groupId);

    res.json({ success: true });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
import * as service from '../services/groupMemberService.js';

export const joinGroupController = async (req, res) => {
  try {
    const result = await service.joinGroup(req.user.id, req.body.groupId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const approveRequestController = async (req, res) => {
  try {
    const result = await service.approveRequest(
      req.user.id,
      req.body.memberId
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const rejectRequestController = async (req, res) => {
  try {
    const result = await service.rejectRequest(
      req.user.id,
      req.body.memberId
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const leaveGroupController = async (req, res) => {
  try {
    const result = await service.leaveGroup(
      req.user.id,
      req.body.groupId
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};
// import * as service from '../services/groupMemberService.js';

// export const joinGroupController = async (req, res) => {
//   try {
//     const { groupId } = req.body;

//     const result = await service.joinGroup(req.user.id, groupId);

//     res.json({
//       success: true,
//       data: result,
//     });

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const approveRequestController = async (req, res) => {
//   try {
//     const { memberId } = req.body;

//     const result = await service.approveRequest(req.user.id, memberId);

//     res.json({
//       success: true,
//       data: result,
//     });

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const rejectRequestController = async (req, res) => {
//   try {
//     const { memberId } = req.body;

//     const result = await service.rejectRequest(req.user.id, memberId);

//     res.json({
//       success: true,
//       data: result,
//     });

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const leaveGroupController = async (req, res) => {
//   try {
//     const { groupId } = req.body;

//     await service.leaveGroup(req.user.id, groupId);

//     res.json({ success: true });

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




import * as service from '../services/groupMemberService.js';

export const joinGroupController = async (req, res) => {
  try {
    const { groupId } = req.body;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: 'groupId is required',
      });
    }

    const result = await service.joinGroup(req.user.id, groupId);

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("JOIN GROUP ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.originalError || error.message,
      }),
    });
  }
};


export const approveRequestController = async (req, res) => {
  try {
    const { memberId } = req.body;

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: 'memberId is required',
      });
    }

    const result = await service.approveRequest(req.user.id, memberId);

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("APPROVE REQUEST ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.originalError || error.message,
      }),
    });
  }
};


export const rejectRequestController = async (req, res) => {
  try {
    const { memberId } = req.body;

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: 'memberId is required',
      });
    }

    const result = await service.rejectRequest(req.user.id, memberId);

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("REJECT REQUEST ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.originalError || error.message,
      }),
    });
  }
};


export const leaveGroupController = async (req, res) => {
  try {
    const { groupId } = req.body;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: 'groupId is required',
      });
    }

    const result = await service.leaveGroup(req.user.id, groupId);

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("LEAVE GROUP ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.originalError || error.message,
      }),
    });
  }
};
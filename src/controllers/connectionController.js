import * as service from '../services/connectionService.js';

export const sendConnectionRequestController = async (req, res) => {
  try {
    const result = await service.sendConnectionRequest(
      req.user.id,
      req.body.recipientId
    );

    res.status(201).json({
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


export const acceptConnectionRequestController = async (req, res) => {
  try {
    const result = await service.acceptConnectionRequest(
      req.user.id,
      req.body.requestId
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


export const rejectConnectionRequestController = async (req, res) => {
  try {
    const result = await service.rejectConnectionRequest(
      req.user.id,
      req.body.requestId
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


export const getConnectionsController = async (req, res) => {
  try {
    const result = await service.getConnections(req.user.id);

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


export const getPendingRequestsController = async (req, res) => {
  try {
    const result = await service.getPendingRequests(req.user.id);

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
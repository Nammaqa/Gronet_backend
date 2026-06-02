import * as service from '../services/messageService.js';

export const sendMessageController = async (req, res) => {
  try {
    const { recipientId, content } = req.body;

    const result = await service.sendMessage(
      req.user.id,
      recipientId,
      content
    );

    return res.status(201).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error('SEND MESSAGE ERROR:', error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};


export const getConversationController = async (req, res) => {
  try {
    const { userId } = req.params;

    const { page = 1, limit = 20 } = req.query;

    const result = await service.getConversation(
      req.user.id,
      userId,
      parseInt(page),
      parseInt(limit)
    );

    return res.json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error('GET CONVERSATION ERROR:', error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};


export const getConversationsController = async (req, res) => {
  try {
    const result = await service.getConversations(req.user.id);

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error('GET CONVERSATIONS ERROR:', error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};


export const markConversationAsReadController = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;

    const result = await service.markConversationAsRead(
      req.user.id,
      userId
    );

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error('MARK READ ERROR:', error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};


export const getUnreadCountController = async (req, res) => {
  try {
    const result = await service.getUnreadCount(req.user.id);

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error('UNREAD COUNT ERROR:', error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};


export const editMessageController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { content } = req.body;

    const result = await service.editMessage(
      id,
      req.user.id,
      content
    );

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error('EDIT MESSAGE ERROR:', error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};
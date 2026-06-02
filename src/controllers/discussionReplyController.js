import * as service from '../services/discussionReplyService.js';

export const createReplyController = async (req, res) => {
  try {
    const reply = await service.createReply(req.user.id, req.body);

    res.status(201).json({
      success: true,
      data: reply,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getRepliesTreeController = async (req, res) => {
  try {
    const tree = await service.getRepliesTree(req.params.discussionId);

    res.json({
      success: true,
      data: tree,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getRootRepliesController = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const result = await service.getRootReplies(
      req.params.discussionId,
      parseInt(page),
      parseInt(limit)
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getChildRepliesController = async (req, res) => {
  try {
    const replies = await service.getChildReplies(req.params.parentReplyId);

    res.json({
      success: true,
      data: replies,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};
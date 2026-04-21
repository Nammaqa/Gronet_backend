import * as service from '../services/discussionReplyService.js';
import { validate as isUUID } from 'uuid';


export const createReplyController = async (req, res) => {
  try {
    const { discussionId, parentReplyId, content } = req.body;

    if (!discussionId || !isUUID(discussionId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid discussionId',
      });
    }

    if (parentReplyId && !isUUID(parentReplyId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parentReplyId',
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content required',
      });
    }

    const reply = await service.createReply(req.user.id, {
      discussionId,
      parentReplyId,
      content,
    });

    res.status(201).json({
      success: true,
      data: reply,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getRepliesTreeController = async (req, res) => {
  try {
    const { discussionId } = req.params;

    if (!isUUID(discussionId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid discussionId',
      });
    }

    const tree = await service.getRepliesTree(discussionId);

    res.json({
      success: true,
      data: tree,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getRootRepliesController = async (req, res) => {
  try {
    const { discussionId } = req.params;

    if (!isUUID(discussionId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid discussionId',
      });
    }

    const { page = 1, limit = 5 } = req.query;

    const result = await service.getRootReplies(
      discussionId,
      parseInt(page),
      parseInt(limit)
    );

    res.json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChildRepliesController = async (req, res) => {
  try {
    const { parentReplyId } = req.params;

    if (!isUUID(parentReplyId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parentReplyId',
      });
    }

    const replies = await service.getChildReplies(parentReplyId);

    res.json({
      success: true,
      data: replies,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
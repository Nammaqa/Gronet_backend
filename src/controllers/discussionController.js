import * as service from '../services/discussionService.js';

export const createDiscussionController = async (req, res) => {
  try {
    const discussion = await service.createDiscussion(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: discussion,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDiscussionsByGroupController = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await service.getDiscussionsByGroup(
      req.params.groupId,
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

export const getAllDiscussionsController = async (req, res) => {
  try {
    const discussions = await service.getAllDiscussions();

    res.json({
      success: true,
      data: discussions,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDiscussionController = async (req, res) => {
  try {
    const discussion = await service.getDiscussionById(req.params.id);

    res.json({
      success: true,
      data: discussion,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDiscussionController = async (req, res) => {
  try {
    const discussion = await service.updateDiscussion(
      req.params.id,
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      data: discussion,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDiscussionController = async (req, res) => {
  try {
    const result = await service.deleteDiscussion(
      req.params.id,
      req.user.id
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
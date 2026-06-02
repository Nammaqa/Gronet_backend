import * as service from '../services/savedContentService.js';

export const saveContentController = async (req, res) => {
  try {
    const { contentSlug, contentType } = req.body;

    const result = await service.saveContent(
      req.user.id,
      contentSlug,
      contentType
    );

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export const unsaveContentController = async (req, res) => {
  try {
    const { contentSlug, contentType } = req.body;

    const result = await service.unsaveContent(
      req.user.id,
      contentSlug,
      contentType
    );

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export const getSavedContentController = async (req, res) => {
  try {
    const result = await service.getSavedContent(req.user.id);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};
import * as service from '../services/commentService.js';

export const createCommentController =
  async (req, res) => {
    try {
      const result =
        await service.createComment(
          req.user.id,
          req.body
        );

      return res.status(201).json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'CREATE COMMENT ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          'Internal server error',
      });
    }
  };

export const editCommentController =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { content } = req.body;

      const result =
        await service.editComment(
          id,
          req.user.id,
          content
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'EDIT COMMENT ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          'Internal server error',
      });
    }
  };

export const deleteCommentController =
  async (req, res) => {
    try {
      const { id } = req.params;

      const result =
        await service.deleteComment(
          id,
          req.user.id
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'DELETE COMMENT ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          'Internal server error',
      });
    }
  };

export const getCommentsController =
  async (req, res) => {
    try {
      const {
        contentId,
        contentType,
      } = req.params;

      const result =
        await service.getComments(
          contentId,
          contentType
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'GET COMMENTS ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          'Internal server error',
      });
    }
  };

export const getCommentCountController =
  async (req, res) => {
    try {
      const {
        contentId,
        contentType,
      } = req.params;

      const result =
        await service.getCommentCount(
          contentId,
          contentType
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'GET COMMENT COUNT ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          'Internal server error',
      });
    }
  };
import * as service from '../services/likeService.js';
export const likeContentController = async (
  req,
  res
) => {
  try {
    const { contentId, contentType } =
      req.body;

    const result =
      await service.likeContent(
        req.user.id,
        contentId,
        contentType
      );

    return res.status(201).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error(
      'LIKE CONTENT ERROR:',
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

/* =========================
   UNLIKE CONTENT
========================= */

export const unlikeContentController =
  async (req, res) => {
    try {
      const {
        contentId,
        contentType,
      } = req.body;

      const result =
        await service.unlikeContent(
          req.user.id,
          contentId,
          contentType
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'UNLIKE CONTENT ERROR:',
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

/* =========================
   GET LIKE COUNT
========================= */

export const getLikeCountController =
  async (req, res) => {
    try {
      const {
        contentId,
        contentType,
      } = req.params;

      const result =
        await service.getLikeCount(
          contentId,
          contentType
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'GET LIKE COUNT ERROR:',
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

/* =========================
   CHECK USER LIKED
========================= */

export const checkUserLikedController =
  async (req, res) => {
    try {
      const {
        contentId,
        contentType,
      } = req.params;

      const result =
        await service.checkUserLiked(
          req.user.id,
          contentId,
          contentType
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'CHECK USER LIKED ERROR:',
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
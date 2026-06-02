import * as service from '../services/articleService.js';

export const createArticleController =
  async (req, res) => {
    try {
      const result =
        await service.createArticle(
          req.user.id,
          req.body
        );

      return res.status(201).json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'CREATE ARTICLE ERROR:',
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


export const getArticlesController =
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
      } = req.query;

      const result =
        await service.getArticles(
          parseInt(page),
          parseInt(limit)
        );

      return res.json({
        success: true,
        ...result,
      });

    } catch (error) {
      console.error(
        'GET ARTICLES ERROR:',
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


export const getArticleByIdController =
  async (req, res) => {
    try {
      const { id } = req.params;

      const result =
        await service.getArticleById(
          id
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'GET ARTICLE ERROR:',
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


export const updateArticleController =
  async (req, res) => {
    try {
      const { id } = req.params;

      const result =
        await service.updateArticle(
          id,
          req.user.id,
          req.body
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'UPDATE ARTICLE ERROR:',
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


export const deleteArticleController =
  async (req, res) => {
    try {
      const { id } = req.params;

      const result =
        await service.deleteArticle(
          id,
          req.user.id
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      console.error(
        'DELETE ARTICLE ERROR:',
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
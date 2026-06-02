import * as searchService from '../services/searchService.js';

export const globalSearchController =
  async (req, res) => {
    try {
      const { q } = req.query;

      if (!q || !q.trim()) {
        return res.status(400).json({
          success: false,

          message:
            'Search query is required',
        });
      }

      const results =
        await searchService.globalSearch(
          q
        );

      return res.json({
        success: true,

        query: q,

        data: results,
      });

    } catch (error) {
      console.error(
        'GLOBAL SEARCH ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,

        message:
          error.message ||
          'Search failed',
      });
    }
  };
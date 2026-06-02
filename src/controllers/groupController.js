import * as service from '../services/groupService.js';

export const createGroupController =
  async (req, res) => {
    try {
      const group =
        await service.createGroup(
          req.user.id,
          req.body
        );

      return res.status(201).json({
        success: true,
        data: group,
      });

    } catch (error) {
      return res.status(
        error.status || 500
      ).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getAllGroupsController =
  async (req, res) => {
    try {
      const groups =
        await service.getAllGroups();

      return res.json({
        success: true,
        data: groups,
      });

    } catch (error) {
      return res.status(
        error.status || 500
      ).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getGroupByIdController =
  async (req, res) => {
    try {
      const group =
        await service.getGroupById(
          req.params.id
        );

      return res.json({
        success: true,
        data: group,
      });

    } catch (error) {
      return res.status(
        error.status || 500
      ).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateGroupController =
  async (req, res) => {
    try {
      const group =
        await service.updateGroup(
          req.params.id,
          req.user.id,
          req.body
        );

      return res.json({
        success: true,
        data: group,
      });

    } catch (error) {
      return res.status(
        error.status || 500
      ).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const deleteGroupController =
  async (req, res) => {
    try {
      const result =
        await service.deleteGroup(
          req.params.id,
          req.user.id
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {
      return res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message,
      });
    }
  };
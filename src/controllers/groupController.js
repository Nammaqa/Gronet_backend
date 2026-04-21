import * as service from '../services/groupService.js';

export const createGroupController = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { name, about, industry, guidelines, type } = req.body;

    if (!name || !about || !industry) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    const group = await service.createGroup(req.user.id, {
      name,
      about,
      industry,
      guidelines,
      type,
    });

    return res.status(201).json({
      success: true,
      data: group,
    });

  } catch (error) {
    console.error("CREATE GROUP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllGroupsController = async (req, res) => {
  try {
    const groups = await service.getAllGroups();

    return res.json({
      success: true,
      data: groups,
    });

  } catch (error) {
    console.error("GET ALL GROUPS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGroupByIdController = async (req, res) => {
  try {
    const group = await service.getGroupById(req.params.id);

    return res.json({
      success: true,
      data: group,
    });

  } catch (error) {
    console.error("GET GROUP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
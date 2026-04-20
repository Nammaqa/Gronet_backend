import {
  getUserById,
  getUserByUserID,
  updateUser,
} from '../services/userService.js';

import cloudinary from '../config/cloudinary.js';

const formatUser = (user) => ({
  id: user.id,
  userID: user.userID,
  displayName: user.displayName,
  designation: user.designation,
  bio: user.bio,
  avatar: user.avatar,
  coverPhoto: user.coverPhoto,
  skills: user.skills,
});


export const getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      data: formatUser(user),
    });

  } catch (error) {
    console.error('getProfile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving profile',
    });
  }
};

export const getProfileByUserID = async (req, res) => {
  try {
    const user = await getUserByUserID(req.params.userID);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      data: formatUser(user),
    });

  } catch (error) {
    console.error('getProfileByUserID error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving profile',
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.user.id, req.body);

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      data: formatUser(updatedUser),
    });

  } catch (error) {
    console.error('updateProfile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating profile',
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'avatars' },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: 'Upload failed',
          });
        }

        await req.user.update({
          avatar: result.secure_url,
        });

        return res.json({
          success: true,
          url: result.secure_url,
        });
      }
    );

    stream.end(req.file.buffer);

  } catch (error) {
    console.error('uploadAvatar error:', error);
    return res.status(500).json({
      success: false,
      message: 'Upload error',
    });
  }
};

export const uploadCoverPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'covers' },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: 'Upload failed',
          });
        }

        await req.user.update({
          coverPhoto: result.secure_url,
        });

        return res.json({
          success: true,
          url: result.secure_url,
        });
      }
    );

    stream.end(req.file.buffer);

  } catch (error) {
    console.error('uploadCoverPhoto error:', error);
    return res.status(500).json({
      success: false,
      message: 'Upload error',
    });
  }
};
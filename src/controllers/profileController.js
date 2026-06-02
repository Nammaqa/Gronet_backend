import * as profileService from '../services/profileService.js';
import { compressImage } from '../utils/imageCompression.js';
import cloudinary from '../config/cloudinary.js';

const formatUser = (user) => ({
  id: user.id,

  userID: user.userID,

  email: user.email,

  phone: user.phone,

  displayName: user.displayName,

  headline: user.headline,

  designation: user.designation,

  bio: user.bio,

  location: user.location,

  avatar: user.avatar,

  coverPhoto: user.coverPhoto,

  skills: user.skills,

  github: user.github,

  linkedin: user.linkedin,

  portfolio: user.portfolio,

  createdAt: user.createdAt,
});


export const getMyProfileController =
  async (req, res) => {
    try {
      const user =
        await profileService.getMyProfile(
          req.user.id
        );

      return res.json({
        success: true,
        data: formatUser(user),
      });

    } catch (error) {
      console.error(
        'GET MY PROFILE ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          'Error retrieving profile',
      });
    }
  };


export const getPublicProfileController =
  async (req, res) => {
    try {
      const { userId } =
        req.params;

      const user =
        await profileService.getPublicProfile(
          userId
        );

      return res.json({
        success: true,
        data: formatUser(user),
      });

    } catch (error) {
      console.error(
        'GET PUBLIC PROFILE ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          'Error retrieving profile',
      });
    }
  };


export const updateProfileController =
  async (req, res) => {
    try {
      const updatedUser =
        await profileService.updateProfile(
          req.user.id,
          req.body
        );

      return res.json({
        success: true,

        message:
          'Profile updated successfully',

        data: formatUser(
          updatedUser
        ),
      });

    } catch (error) {
      console.error(
        'UPDATE PROFILE ERROR:',
        error
      );

      return res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          'Error updating profile',
      });
    }
  };


export const uploadAvatarController =
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const compressedBuffer =
        await compressImage(
          req.file.buffer,
          'avatar'
        );

      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: 'avatars',

            transformation: [
              {
                width: 400,
                height: 400,
                crop: 'fill',
              },
              {
                quality: 'auto',
              },
            ],
          },

          async (
            uploadError,
            result
          ) => {
            if (uploadError) {
              console.error(
                'CLOUDINARY AVATAR ERROR:',
                uploadError
              );

              return res.status(
                500
              ).json({
                success: false,
                message:
                  'Avatar upload failed',
              });
            }

            const updatedUser =
              await profileService.updateProfile(
                req.user.id,
                {
                  avatar:
                    result.secure_url,
                }
              );

            return res.json({
              success: true,

              message:
                'Avatar uploaded successfully',

              data: formatUser(
                updatedUser
              ),
            });
          }
        );

      stream.end(compressedBuffer);

    } catch (error) {
      console.error(
        'UPLOAD AVATAR ERROR:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          'Avatar upload error',
      });
    }
  };


export const uploadCoverPhotoController =
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const compressedBuffer =
        await compressImage(
          req.file.buffer,
          'cover'
        );

      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: 'covers',

            transformation: [
              {
                width: 1200,
                crop: 'limit',
              },
              {
                quality: 'auto',
              },
            ],
          },

          async (
            uploadError,
            result
          ) => {
            if (uploadError) {
              console.error(
                'CLOUDINARY COVER ERROR:',
                uploadError
              );

              return res.status(
                500
              ).json({
                success: false,
                message:
                  'Cover upload failed',
              });
            }

            const updatedUser =
              await profileService.updateProfile(
                req.user.id,
                {
                  coverPhoto:
                    result.secure_url,
                }
              );

            return res.json({
              success: true,

              message:
                'Cover photo uploaded successfully',

              data: formatUser(
                updatedUser
              ),
            });
          }
        );

      stream.end(compressedBuffer);

    } catch (error) {
      console.error(
        'UPLOAD COVER PHOTO ERROR:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          'Cover upload error',
      });
    }
  };
import prisma from '../config/database.js';
import { generateToken, hashPassword, comparePassword } from '../utils/auth.js';
import axios from 'axios';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

// Register user
export const register = async (req, res) => {
  try {
    const { email, password, displayName, phone } = req.body;

    // Validate input
    if (!email || !password || !displayName) {
      return res.status(400).json({ 
        success: false,
        message: 'Email, password, and displayName are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters' 
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save user to Gronet database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        displayName,
        phone: phone || null,
        bio: null,
        avatar: null,
      },
    });

    // Sync with WordPress (optional)
    try {
      await axios.post(`${WORDPRESS_API_URL}/wp-json/wp/v2/users`, {
        username: email.split('@')[0],
        email,
        password, // Send plain password to WordPress
        name: displayName,
      });
    } catch (wpError) {
      console.log('WordPress sync warning:', wpError.message);
      // Continue even if WordPress sync fails
    }

    // Generate JWT token
    const token = generateToken(user.id, displayName, email, 'student');

    res.status(201).json({
      success: true,
      message: 'Signup successful',
      token,
      name: displayName,
      email: user.email,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Registration failed' 
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // Find user in database by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // User not found
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Compare entered password with stored hashed password
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = generateToken(user.id, user.displayName, user.email, 'student');

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      name: user.displayName,
      email: user.email,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Login failed' 
    });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT middleware

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        phone: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to fetch profile' 
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT middleware
    const { displayName, bio, avatar, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        displayName: displayName || undefined,
        bio: bio || undefined,
        avatar: avatar || undefined,
        phone: phone || undefined,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to update profile' 
    });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    res.status(200).json({ 
      success: true,
      message: 'Logout successful' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message || 'Logout failed' 
    });
  }
};

// Refresh token
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ 
        success: false,
        message: 'Refresh token is required' 
      });
    }

    // Verify and decode refresh token (implement this in your auth utils)
    const decoded = verifyRefreshToken(refreshToken);
    
    if (!decoded) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired refresh token' 
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Generate new access token
    const newToken = generateToken(user.id, user.displayName, user.email, 'student');

    res.status(200).json({ 
      success: true,
      token: newToken 
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ 
      success: false,
      message: error.message || 'Token refresh failed' 
    });
  }
};

// Verify WordPress authentication (cross-module auth)
export const verifyWordPressAuth = async (req, res) => {
  try {
    const { wpToken } = req.body;

    if (!wpToken) {
      return res.status(400).json({ 
        success: false,
        message: 'WordPress token is required' 
      });
    }

    // Verify WordPress token and get user data
    const wpResponse = await axios.get(
      `${WORDPRESS_API_URL}/wp-json/wp/v2/users/me`,
      {
        headers: { Authorization: `Bearer ${wpToken}` },
      }
    );

    const wpUserData = wpResponse.data;
    const email = wpUserData.email;

    // Find or create user in Gronet
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Auto-create user from WordPress data
      user = await prisma.user.create({
        data: {
          email,
          displayName: wpUserData.name || email,
          avatar: wpUserData.avatar_urls?.[96] || null,
          password: '', // No password for WordPress-synced users
          bio: null,
          phone: null,
        },
      });
    }

    // Generate Gronet token
    const token = generateToken(user.id, user.displayName, user.email, 'student');

    res.status(200).json({
      success: true,
      message: 'Verified via WordPress',
      token,
      name: user.displayName,
      email: user.email,
    });
  } catch (error) {
    console.error('WordPress verification error:', error);
    res.status(401).json({ 
      success: false,
      message: error.message || 'WordPress verification failed' 
    });
  }
};
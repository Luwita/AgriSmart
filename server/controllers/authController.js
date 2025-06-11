import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse, sendError } from '../utils/apiResponse.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, farmProfile, preferences } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return sendError(res, 400, 'User already exists with this email');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || 'farmer',
    farmProfile,
    preferences: {
      language: preferences?.language || 'English',
      currency: 'ZMW',
      notifications: true,
      theme: 'light',
      ...preferences
    }
  });

  // Generate token
  const token = generateToken(user._id);

  sendResponse(res, 201, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      farmProfile: user.farmProfile,
      preferences: user.preferences
    }
  }, 'User registered successfully');
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email, isActive: true }).select('+password');
  if (!user) {
    return sendError(res, 401, 'Invalid credentials');
  }

  // Check password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return sendError(res, 401, 'Invalid credentials');
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = generateToken(user._id);

  sendResponse(res, 200, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      farmProfile: user.farmProfile,
      preferences: user.preferences
    }
  }, 'Login successful');
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  
  sendResponse(res, 200, { user }, 'User profile retrieved');
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const fieldsToUpdate = { ...req.body };
  delete fieldsToUpdate.password; // Don't allow password updates through this endpoint

  const user = await User.findByIdAndUpdate(
    req.userId,
    fieldsToUpdate,
    { new: true, runValidators: true }
  );

  sendResponse(res, 200, { user }, 'Profile updated successfully');
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.userId).select('+password');

  // Check current password
  const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordCorrect) {
    return sendError(res, 400, 'Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  sendResponse(res, 200, null, 'Password changed successfully');
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, 404, 'User not found');
  }

  // In production, implement email sending logic here
  // For now, just return success
  sendResponse(res, 200, null, 'Password reset instructions sent to email');
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // In a stateless JWT system, logout is handled client-side
  // You could implement token blacklisting here if needed
  sendResponse(res, 200, null, 'Logged out successfully');
});
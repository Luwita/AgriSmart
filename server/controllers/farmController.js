import Farm from '../models/Farm.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse, sendError } from '../utils/apiResponse.js';

// @desc    Get all farms for user
// @route   GET /api/farms
// @access  Private
export const getFarms = asyncHandler(async (req, res) => {
  const farms = await Farm.find({ 
    owner: req.userId, 
    isActive: true 
  }).populate('owner', 'name email');

  sendResponse(res, 200, { farms }, 'Farms retrieved successfully');
});

// @desc    Get single farm
// @route   GET /api/farms/:id
// @access  Private
export const getFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  }).populate('owner', 'name email');

  if (!farm) {
    return sendError(res, 404, 'Farm not found');
  }

  sendResponse(res, 200, { farm }, 'Farm retrieved successfully');
});

// @desc    Create new farm
// @route   POST /api/farms
// @access  Private
export const createFarm = asyncHandler(async (req, res) => {
  const farmData = {
    ...req.body,
    owner: req.userId
  };

  const farm = await Farm.create(farmData);
  const populatedFarm = await Farm.findById(farm._id).populate('owner', 'name email');

  sendResponse(res, 201, { farm: populatedFarm }, 'Farm created successfully');
});

// @desc    Update farm
// @route   PUT /api/farms/:id
// @access  Private
export const updateFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId, isActive: true },
    req.body,
    { new: true, runValidators: true }
  ).populate('owner', 'name email');

  if (!farm) {
    return sendError(res, 404, 'Farm not found');
  }

  sendResponse(res, 200, { farm }, 'Farm updated successfully');
});

// @desc    Delete farm
// @route   DELETE /api/farms/:id
// @access  Private
export const deleteFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    { isActive: false },
    { new: true }
  );

  if (!farm) {
    return sendError(res, 404, 'Farm not found');
  }

  sendResponse(res, 200, null, 'Farm deleted successfully');
});

// @desc    Get farm statistics
// @route   GET /api/farms/:id/stats
// @access  Private
export const getFarmStats = asyncHandler(async (req, res) => {
  const farm = await Farm.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  });

  if (!farm) {
    return sendError(res, 404, 'Farm not found');
  }

  // Calculate farm statistics
  const stats = {
    totalArea: farm.totalArea,
    utilizationRate: farm.performance?.efficiency || 0,
    profitability: farm.performance?.profitMargin || 0,
    sustainabilityScore: farm.performance?.sustainabilityScore || 0,
    establishedYears: new Date().getFullYear() - (farm.establishedYear || new Date().getFullYear()),
    blockCount: farm.blocks?.length || 0
  };

  sendResponse(res, 200, { stats }, 'Farm statistics retrieved');
});
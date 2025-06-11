import Crop from '../models/Crop.js';
import Farm from '../models/Farm.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse, sendError } from '../utils/apiResponse.js';

// @desc    Get all crops for user
// @route   GET /api/crops
// @access  Private
export const getCrops = asyncHandler(async (req, res) => {
  const { farm, status, growthStage } = req.query;
  
  let filter = { owner: req.userId, isActive: true };
  
  if (farm) filter.farm = farm;
  if (status) filter.status = status;
  if (growthStage) filter.growthStage = growthStage;

  const crops = await Crop.find(filter)
    .populate('farm', 'name location')
    .sort({ createdAt: -1 });

  sendResponse(res, 200, { crops }, 'Crops retrieved successfully');
});

// @desc    Get single crop
// @route   GET /api/crops/:id
// @access  Private
export const getCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  }).populate('farm', 'name location');

  if (!crop) {
    return sendError(res, 404, 'Crop not found');
  }

  sendResponse(res, 200, { crop }, 'Crop retrieved successfully');
});

// @desc    Create new crop
// @route   POST /api/crops
// @access  Private
export const createCrop = asyncHandler(async (req, res) => {
  // Verify farm ownership
  const farm = await Farm.findOne({
    _id: req.body.farm,
    owner: req.userId,
    isActive: true
  });

  if (!farm) {
    return sendError(res, 404, 'Farm not found');
  }

  const cropData = {
    ...req.body,
    owner: req.userId
  };

  const crop = await Crop.create(cropData);
  const populatedCrop = await Crop.findById(crop._id).populate('farm', 'name location');

  sendResponse(res, 201, { crop: populatedCrop }, 'Crop created successfully');
});

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private
export const updateCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId, isActive: true },
    req.body,
    { new: true, runValidators: true }
  ).populate('farm', 'name location');

  if (!crop) {
    return sendError(res, 404, 'Crop not found');
  }

  sendResponse(res, 200, { crop }, 'Crop updated successfully');
});

// @desc    Add activity to crop
// @route   POST /api/crops/:id/activities
// @access  Private
export const addActivity = asyncHandler(async (req, res) => {
  const crop = await Crop.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  });

  if (!crop) {
    return sendError(res, 404, 'Crop not found');
  }

  crop.activities.push({
    ...req.body,
    date: new Date()
  });

  await crop.save();

  sendResponse(res, 200, { crop }, 'Activity added successfully');
});

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private
export const deleteCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    { isActive: false },
    { new: true }
  );

  if (!crop) {
    return sendError(res, 404, 'Crop not found');
  }

  sendResponse(res, 200, null, 'Crop deleted successfully');
});

// @desc    Get crop analytics
// @route   GET /api/crops/:id/analytics
// @access  Private
export const getCropAnalytics = asyncHandler(async (req, res) => {
  const crop = await Crop.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  });

  if (!crop) {
    return sendError(res, 404, 'Crop not found');
  }

  const analytics = {
    growthProgress: calculateGrowthProgress(crop),
    healthTrend: calculateHealthTrend(crop),
    yieldPrediction: crop.yieldPrediction,
    costAnalysis: crop.economics,
    sustainabilityMetrics: crop.sustainability,
    recommendations: generateRecommendations(crop)
  };

  sendResponse(res, 200, { analytics }, 'Crop analytics retrieved');
});

// Helper functions
const calculateGrowthProgress = (crop) => {
  const plantingDate = new Date(crop.plantingDate);
  const expectedHarvest = new Date(crop.expectedHarvest);
  const now = new Date();
  
  const totalDays = (expectedHarvest - plantingDate) / (1000 * 60 * 60 * 24);
  const daysPassed = (now - plantingDate) / (1000 * 60 * 60 * 24);
  
  return Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
};

const calculateHealthTrend = (crop) => {
  // Simple health trend calculation
  return crop.health > 90 ? 'excellent' : crop.health > 75 ? 'good' : crop.health > 60 ? 'fair' : 'poor';
};

const generateRecommendations = (crop) => {
  const recommendations = [];
  
  if (crop.health < 80) {
    recommendations.push('Consider soil testing and nutrient supplementation');
  }
  
  if (crop.growthStage === 'Flowering') {
    recommendations.push('Monitor for pest activity during flowering stage');
  }
  
  return recommendations;
};
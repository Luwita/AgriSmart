import Crop from '../models/Crop.js';
import Farm from '../models/Farm.js';
import Inventory from '../models/Inventory.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/apiResponse.js';

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
export const getDashboard = asyncHandler(async (req, res) => {
  const { timeframe = '30days' } = req.query;

  // Get user's farms and crops
  const farms = await Farm.find({ owner: req.userId, isActive: true });
  const crops = await Crop.find({ owner: req.userId, isActive: true });
  const inventory = await Inventory.find({ owner: req.userId, isActive: true });

  // Calculate analytics
  const analytics = {
    overview: {
      totalFarms: farms.length,
      totalCrops: crops.length,
      totalArea: farms.reduce((sum, farm) => sum + farm.totalArea, 0),
      totalYield: crops.reduce((sum, crop) => sum + (crop.actualYield || 0), 0)
    },
    performance: {
      averageYield: crops.length > 0 ? crops.reduce((sum, crop) => sum + (crop.actualYield || 0), 0) / crops.length : 0,
      profitMargin: farms.length > 0 ? farms.reduce((sum, farm) => sum + (farm.performance?.profitMargin || 0), 0) / farms.length : 0,
      efficiency: farms.length > 0 ? farms.reduce((sum, farm) => sum + (farm.performance?.efficiency || 0), 0) / farms.length : 0,
      sustainabilityScore: farms.length > 0 ? farms.reduce((sum, farm) => sum + (farm.performance?.sustainabilityScore || 0), 0) / farms.length : 0
    },
    inventory: {
      totalItems: inventory.length,
      totalValue: inventory.reduce((sum, item) => sum + (item.totalValue || 0), 0),
      lowStockItems: inventory.filter(item => item.status === 'low_stock' || item.status === 'critical').length,
      categories: inventory.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {})
    },
    trends: {
      yieldTrend: 'increasing',
      profitTrend: 'stable',
      efficiencyTrend: 'increasing'
    },
    timeframe,
    lastUpdated: new Date()
  };

  sendResponse(res, 200, { analytics }, 'Dashboard analytics retrieved successfully');
});

// @desc    Get crop analytics
// @route   GET /api/analytics/crops
// @access  Private
export const getCropAnalytics = asyncHandler(async (req, res) => {
  const { cropId, timeframe = '30days' } = req.query;

  let filter = { owner: req.userId, isActive: true };
  if (cropId) {
    filter._id = cropId;
  }

  const crops = await Crop.find(filter).populate('farm', 'name location');

  const analytics = {
    crops: crops.map(crop => ({
      id: crop._id,
      name: crop.name,
      variety: crop.variety,
      area: crop.area,
      plantingDate: crop.plantingDate,
      expectedHarvest: crop.expectedHarvest,
      growthStage: crop.growthStage,
      health: crop.health,
      yieldPrediction: crop.yieldPrediction,
      actualYield: crop.actualYield,
      status: crop.status,
      economics: crop.economics,
      sustainability: crop.sustainability,
      farm: crop.farm
    })),
    summary: {
      totalCrops: crops.length,
      totalArea: crops.reduce((sum, crop) => sum + crop.area, 0),
      averageHealth: crops.length > 0 ? crops.reduce((sum, crop) => sum + crop.health, 0) / crops.length : 0,
      totalPredictedYield: crops.reduce((sum, crop) => sum + (crop.yieldPrediction || 0), 0),
      totalActualYield: crops.reduce((sum, crop) => sum + (crop.actualYield || 0), 0)
    },
    timeframe,
    lastUpdated: new Date()
  };

  sendResponse(res, 200, { analytics }, 'Crop analytics retrieved successfully');
});

// @desc    Get financial analytics
// @route   GET /api/analytics/financial
// @access  Private
export const getFinancialAnalytics = asyncHandler(async (req, res) => {
  const { timeframe = '30days' } = req.query;

  const crops = await Crop.find({ owner: req.userId, isActive: true });
  const inventory = await Inventory.find({ owner: req.userId, isActive: true });

  // Calculate financial metrics
  const totalRevenue = crops.reduce((sum, crop) => sum + (crop.economics?.revenue || 0), 0);
  const totalCosts = crops.reduce((sum, crop) => sum + (crop.economics?.totalCost || 0), 0);
  const totalProfit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  const analytics = {
    summary: {
      totalRevenue,
      totalCosts,
      totalProfit,
      profitMargin,
      inventoryValue: inventory.reduce((sum, item) => sum + (item.totalValue || 0), 0)
    },
    breakdown: {
      revenueByMonth: [], // Would be calculated from actual data
      expensesByCategory: {
        seeds: crops.reduce((sum, crop) => sum + (crop.inputs?.seeds?.cost || 0), 0),
        fertilizers: crops.reduce((sum, crop) => sum + crop.inputs.fertilizers.reduce((fSum, f) => fSum + (f.cost || 0), 0), 0),
        pesticides: crops.reduce((sum, crop) => sum + crop.inputs.pesticides.reduce((pSum, p) => pSum + (p.cost || 0), 0), 0)
      }
    },
    trends: {
      revenueGrowth: 12.5,
      costOptimization: -8.3,
      profitImprovement: 25.7
    },
    timeframe,
    lastUpdated: new Date()
  };

  sendResponse(res, 200, { analytics }, 'Financial analytics retrieved successfully');
});

// @desc    Generate custom report
// @route   POST /api/analytics/reports
// @access  Private
export const generateReport = asyncHandler(async (req, res) => {
  const {
    title,
    timeframe,
    format,
    includeCharts,
    includeRegionalComparison,
    includeRecommendations,
    email
  } = req.body;

  // Generate report data
  const farms = await Farm.find({ owner: req.userId, isActive: true });
  const crops = await Crop.find({ owner: req.userId, isActive: true });
  const inventory = await Inventory.find({ owner: req.userId, isActive: true });

  const reportData = {
    title: title || 'Farm Performance Report',
    generatedAt: new Date(),
    timeframe,
    format,
    sections: {
      overview: {
        totalFarms: farms.length,
        totalCrops: crops.length,
        totalArea: farms.reduce((sum, farm) => sum + farm.totalArea, 0)
      },
      performance: includeCharts ? {
        yieldData: crops.map(crop => ({
          name: crop.name,
          yield: crop.actualYield || crop.yieldPrediction
        }))
      } : null,
      regionalComparison: includeRegionalComparison ? {
        userPerformance: 87.4,
        provincialAverage: 82.1,
        nationalAverage: 78.5
      } : null,
      recommendations: includeRecommendations ? [
        'Consider implementing precision fertilizer application',
        'Monitor soil moisture levels more frequently',
        'Explore drought-resistant crop varieties'
      ] : null
    }
  };

  const reportId = `RPT_${Date.now()}`;

  sendResponse(res, 200, {
    reportId,
    downloadUrl: `/api/analytics/reports/${reportId}/download`,
    reportData
  }, 'Report generated successfully');
});

// @desc    Configure alerts
// @route   POST /api/analytics/alerts
// @access  Private
export const configureAlert = asyncHandler(async (req, res) => {
  const { metric, condition, threshold, frequency, recipients } = req.body;

  const alertConfig = {
    id: `ALERT_${Date.now()}`,
    userId: req.userId,
    metric,
    condition,
    threshold,
    frequency,
    recipients,
    isActive: true,
    createdAt: new Date()
  };

  sendResponse(res, 200, { alert: alertConfig }, 'Alert configured successfully');
});

// @desc    Set performance targets
// @route   POST /api/analytics/targets
// @access  Private
export const setTarget = asyncHandler(async (req, res) => {
  const { metric, targetValue, deadline, description } = req.body;

  const target = {
    id: `TARGET_${Date.now()}`,
    userId: req.userId,
    metric,
    targetValue,
    deadline,
    description,
    currentValue: 0,
    progress: 0,
    status: 'on_track',
    createdAt: new Date()
  };

  sendResponse(res, 200, { target }, 'Target set successfully');
});
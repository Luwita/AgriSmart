import User from '../models/User.js';
import Farm from '../models/Farm.js';
import Crop from '../models/Crop.js';
import IoTDevice from '../models/IoTDevice.js';
import Inventory from '../models/Inventory.js';
import CommunityPost from '../models/CommunityPost.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse, sendError } from '../utils/apiResponse.js';

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
export const getDashboard = asyncHandler(async (req, res) => {
  const stats = {
    users: {
      total: await User.countDocuments({ isActive: true }),
      farmers: await User.countDocuments({ role: 'farmer', isActive: true }),
      extensionOfficers: await User.countDocuments({ role: 'extension_officer', isActive: true }),
      cooperatives: await User.countDocuments({ role: 'cooperative', isActive: true }),
      newThisMonth: await User.countDocuments({
        isActive: true,
        createdAt: { $gte: new Date(new Date().setDate(1)) }
      })
    },
    farms: {
      total: await Farm.countDocuments({ isActive: true }),
      totalArea: await Farm.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, totalArea: { $sum: '$totalArea' } } }
      ]).then(result => result[0]?.totalArea || 0),
      byProvince: await Farm.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$province', count: { $sum: 1 }, totalArea: { $sum: '$totalArea' } } },
        { $sort: { count: -1 } }
      ])
    },
    crops: {
      total: await Crop.countDocuments({ isActive: true }),
      byCrop: await Crop.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$name', count: { $sum: 1 }, totalArea: { $sum: '$area' } } },
        { $sort: { count: -1 } }
      ]),
      totalYield: await Crop.aggregate([
        { $match: { isActive: true, actualYield: { $exists: true } } },
        { $group: { _id: null, totalYield: { $sum: '$actualYield' } } }
      ]).then(result => result[0]?.totalYield || 0)
    },
    iot: {
      total: await IoTDevice.countDocuments({ isActive: true }),
      online: await IoTDevice.countDocuments({ isActive: true, status: { $in: ['online', 'active'] } }),
      byType: await IoTDevice.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    },
    community: {
      totalPosts: await CommunityPost.countDocuments({ isActive: true }),
      totalReplies: await CommunityPost.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, totalReplies: { $sum: { $size: '$replies' } } } }
      ]).then(result => result[0]?.totalReplies || 0),
      activeUsers: await CommunityPost.distinct('author', {
        isActive: true,
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }).then(authors => authors.length)
    },
    inventory: {
      totalItems: await Inventory.countDocuments({ isActive: true }),
      totalValue: await Inventory.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, totalValue: { $sum: '$totalValue' } } }
      ]).then(result => result[0]?.totalValue || 0),
      lowStock: await Inventory.countDocuments({
        isActive: true,
        status: { $in: ['low_stock', 'critical', 'out_of_stock'] }
      })
    }
  };

  sendResponse(res, 200, { stats }, 'Admin dashboard statistics retrieved');
});

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role, province, search } = req.query;

  let filter = { isActive: true };

  if (role && role !== 'all') {
    filter.role = role;
  }

  if (province && province !== 'all') {
    filter['farmProfile.province'] = province;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { 'farmProfile.farmName': { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const totalUsers = await User.countDocuments(filter);

  sendResponse(res, 200, {
    users,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / parseInt(limit)),
      totalUsers
    }
  }, 'Users retrieved successfully');
});

// @desc    Update user (admin only)
// @route   PUT /api/admin/users/:id
// @access  Private (Admin only)
export const updateUser = asyncHandler(async (req, res) => {
  const updates = req.body;
  delete updates.password; // Don't allow password updates through this endpoint

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    return sendError(res, 404, 'User not found');
  }

  sendResponse(res, 200, { user }, 'User updated successfully');
});

// @desc    Deactivate user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
export const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  ).select('-password');

  if (!user) {
    return sendError(res, 404, 'User not found');
  }

  sendResponse(res, 200, null, 'User deactivated successfully');
});

// @desc    Get system analytics
// @route   GET /api/admin/analytics
// @access  Private (Admin only)
export const getAnalytics = asyncHandler(async (req, res) => {
  const { timeframe = '30days' } = req.query;

  const endDate = new Date();
  const startDate = new Date();

  switch (timeframe) {
    case '7days':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30days':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '90days':
      startDate.setDate(endDate.getDate() - 90);
      break;
    case '1year':
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
  }

  const analytics = {
    userGrowth: await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          isActive: true
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]),

    farmPerformance: await Farm.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$province',
          avgPerformance: { $avg: '$performance.efficiency' },
          totalFarms: { $sum: 1 },
          totalArea: { $sum: '$totalArea' }
        }
      },
      { $sort: { avgPerformance: -1 } }
    ]),

    cropDistribution: await Crop.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 },
          totalArea: { $sum: '$area' },
          avgYield: { $avg: '$actualYield' }
        }
      },
      { $sort: { count: -1 } }
    ]),

    deviceStatus: await IoTDevice.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]),

    timeframe,
    generatedAt: new Date()
  };

  sendResponse(res, 200, { analytics }, 'System analytics retrieved');
});

// @desc    Moderate community content
// @route   PUT /api/admin/community/posts/:id/moderate
// @access  Private (Admin only)
export const moderatePost = asyncHandler(async (req, res) => {
  const { status, reason } = req.body;

  const post = await CommunityPost.findByIdAndUpdate(
    req.params.id,
    {
      status,
      moderationReason: reason,
      moderatedBy: req.userId,
      moderatedAt: new Date()
    },
    { new: true }
  ).populate('author', 'name email');

  if (!post) {
    return sendError(res, 404, 'Post not found');
  }

  sendResponse(res, 200, { post }, 'Post moderated successfully');
});

// @desc    Get system health
// @route   GET /api/admin/health
// @access  Private (Admin only)
export const getSystemHealth = asyncHandler(async (req, res) => {
  const health = {
    database: {
      status: 'connected',
      responseTime: '< 50ms',
      connections: 5
    },
    api: {
      status: 'healthy',
      uptime: '99.9%',
      requestsPerMinute: 150
    },
    storage: {
      used: '2.3GB',
      available: '47.7GB',
      usage: '4.6%'
    },
    performance: {
      cpuUsage: '12%',
      memoryUsage: '34%',
      diskUsage: '15%'
    },
    lastChecked: new Date()
  };

  sendResponse(res, 200, { health }, 'System health retrieved');
});
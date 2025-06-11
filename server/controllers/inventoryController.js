import Inventory from '../models/Inventory.js';
import Farm from '../models/Farm.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse, sendError } from '../utils/apiResponse.js';

// @desc    Get all inventory items for user
// @route   GET /api/inventory
// @access  Private
export const getItems = asyncHandler(async (req, res) => {
  const { category, status, farm } = req.query;
  
  let filter = { owner: req.userId, isActive: true };
  
  if (category && category !== 'all') filter.category = category;
  if (status && status !== 'all') filter.status = status;
  if (farm) filter.farm = farm;

  const items = await Inventory.find(filter)
    .populate('farm', 'name location')
    .sort({ createdAt: -1 });

  sendResponse(res, 200, { items }, 'Inventory items retrieved successfully');
});

// @desc    Get single inventory item
// @route   GET /api/inventory/:id
// @access  Private
export const getItem = asyncHandler(async (req, res) => {
  const item = await Inventory.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  }).populate('farm', 'name location');

  if (!item) {
    return sendError(res, 404, 'Inventory item not found');
  }

  sendResponse(res, 200, { item }, 'Inventory item retrieved successfully');
});

// @desc    Create new inventory item
// @route   POST /api/inventory
// @access  Private
export const createItem = asyncHandler(async (req, res) => {
  // Verify farm ownership if farm is specified
  if (req.body.farm) {
    const farm = await Farm.findOne({
      _id: req.body.farm,
      owner: req.userId,
      isActive: true
    });

    if (!farm) {
      return sendError(res, 404, 'Farm not found');
    }
  }

  const itemData = {
    ...req.body,
    owner: req.userId
  };

  const item = await Inventory.create(itemData);
  const populatedItem = await Inventory.findById(item._id).populate('farm', 'name location');

  sendResponse(res, 201, { item: populatedItem }, 'Inventory item created successfully');
});

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Private
export const updateItem = asyncHandler(async (req, res) => {
  const item = await Inventory.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId, isActive: true },
    req.body,
    { new: true, runValidators: true }
  ).populate('farm', 'name location');

  if (!item) {
    return sendError(res, 404, 'Inventory item not found');
  }

  sendResponse(res, 200, { item }, 'Inventory item updated successfully');
});

// @desc    Add transaction to inventory item
// @route   POST /api/inventory/:id/transactions
// @access  Private
export const addTransaction = asyncHandler(async (req, res) => {
  const item = await Inventory.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  });

  if (!item) {
    return sendError(res, 404, 'Inventory item not found');
  }

  const transaction = {
    ...req.body,
    date: new Date()
  };

  item.transactions.push(transaction);

  // Update quantity based on transaction type
  if (transaction.type === 'purchase') {
    item.quantity += transaction.quantity;
  } else if (['usage', 'sale', 'waste'].includes(transaction.type)) {
    item.quantity = Math.max(0, item.quantity - transaction.quantity);
  }

  await item.save();

  sendResponse(res, 200, { item }, 'Transaction added successfully');
});

// @desc    Get low stock alerts
// @route   GET /api/inventory/alerts/low-stock
// @access  Private
export const getLowStockAlerts = asyncHandler(async (req, res) => {
  const lowStockItems = await Inventory.find({
    owner: req.userId,
    isActive: true,
    status: { $in: ['low_stock', 'critical', 'out_of_stock'] }
  }).populate('farm', 'name location');

  sendResponse(res, 200, { items: lowStockItems }, 'Low stock alerts retrieved');
});

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private
export const deleteItem = asyncHandler(async (req, res) => {
  const item = await Inventory.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    { isActive: false },
    { new: true }
  );

  if (!item) {
    return sendError(res, 404, 'Inventory item not found');
  }

  sendResponse(res, 200, null, 'Inventory item deleted successfully');
});
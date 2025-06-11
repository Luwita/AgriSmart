import IoTDevice from '../models/IoTDevice.js';
import Farm from '../models/Farm.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse, sendError } from '../utils/apiResponse.js';

// @desc    Get all IoT devices for user
// @route   GET /api/iot
// @access  Private
export const getDevices = asyncHandler(async (req, res) => {
  const { farm, type, status } = req.query;
  
  let filter = { owner: req.userId, isActive: true };
  
  if (farm) filter.farm = farm;
  if (type) filter.type = type;
  if (status) filter.status = status;

  const devices = await IoTDevice.find(filter)
    .populate('farm', 'name location')
    .sort({ createdAt: -1 });

  sendResponse(res, 200, { devices }, 'Devices retrieved successfully');
});

// @desc    Get single IoT device
// @route   GET /api/iot/:id
// @access  Private
export const getDevice = asyncHandler(async (req, res) => {
  const device = await IoTDevice.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  }).populate('farm', 'name location');

  if (!device) {
    return sendError(res, 404, 'Device not found');
  }

  sendResponse(res, 200, { device }, 'Device retrieved successfully');
});

// @desc    Create new IoT device
// @route   POST /api/iot
// @access  Private
export const createDevice = asyncHandler(async (req, res) => {
  // Verify farm ownership
  const farm = await Farm.findOne({
    _id: req.body.farm,
    owner: req.userId,
    isActive: true
  });

  if (!farm) {
    return sendError(res, 404, 'Farm not found');
  }

  const deviceData = {
    ...req.body,
    owner: req.userId,
    deviceId: req.body.deviceId || `DEV_${Date.now()}`
  };

  const device = await IoTDevice.create(deviceData);
  const populatedDevice = await IoTDevice.findById(device._id).populate('farm', 'name location');

  sendResponse(res, 201, { device: populatedDevice }, 'Device created successfully');
});

// @desc    Update IoT device
// @route   PUT /api/iot/:id
// @access  Private
export const updateDevice = asyncHandler(async (req, res) => {
  const device = await IoTDevice.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId, isActive: true },
    req.body,
    { new: true, runValidators: true }
  ).populate('farm', 'name location');

  if (!device) {
    return sendError(res, 404, 'Device not found');
  }

  sendResponse(res, 200, { device }, 'Device updated successfully');
});

// @desc    Add reading to IoT device
// @route   POST /api/iot/:id/readings
// @access  Private
export const addReading = asyncHandler(async (req, res) => {
  const device = await IoTDevice.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  });

  if (!device) {
    return sendError(res, 404, 'Device not found');
  }

  const reading = {
    ...req.body,
    timestamp: new Date()
  };

  device.readings.push(reading);
  device.lastUpdate = new Date();

  // Keep only last 1000 readings
  if (device.readings.length > 1000) {
    device.readings = device.readings.slice(-1000);
  }

  await device.save();

  sendResponse(res, 200, { device }, 'Reading added successfully');
});

// @desc    Get device readings
// @route   GET /api/iot/:id/readings
// @access  Private
export const getReadings = asyncHandler(async (req, res) => {
  const { limit = 100, startDate, endDate } = req.query;

  const device = await IoTDevice.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  });

  if (!device) {
    return sendError(res, 404, 'Device not found');
  }

  let readings = device.readings;

  // Filter by date range if provided
  if (startDate || endDate) {
    readings = readings.filter(reading => {
      const readingDate = new Date(reading.timestamp);
      if (startDate && readingDate < new Date(startDate)) return false;
      if (endDate && readingDate > new Date(endDate)) return false;
      return true;
    });
  }

  // Limit results
  readings = readings.slice(-parseInt(limit));

  sendResponse(res, 200, { readings }, 'Readings retrieved successfully');
});

// @desc    Add alert to IoT device
// @route   POST /api/iot/:id/alerts
// @access  Private
export const addAlert = asyncHandler(async (req, res) => {
  const device = await IoTDevice.findOne({
    _id: req.params.id,
    owner: req.userId,
    isActive: true
  });

  if (!device) {
    return sendError(res, 404, 'Device not found');
  }

  const alert = {
    ...req.body,
    timestamp: new Date()
  };

  device.alerts.push(alert);
  await device.save();

  sendResponse(res, 200, { device }, 'Alert added successfully');
});

// @desc    Delete IoT device
// @route   DELETE /api/iot/:id
// @access  Private
export const deleteDevice = asyncHandler(async (req, res) => {
  const device = await IoTDevice.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    { isActive: false },
    { new: true }
  );

  if (!device) {
    return sendError(res, 404, 'Device not found');
  }

  sendResponse(res, 200, null, 'Device deleted successfully');
});
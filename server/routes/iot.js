import express from 'express';
import IoTDevice from '../models/IoTDevice.js';
import Farm from '../models/Farm.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all IoT devices for user
router.get('/', auth, async (req, res) => {
  try {
    const devices = await IoTDevice.find({ owner: req.userId, isActive: true })
      .populate('farm', 'name location')
      .sort({ createdAt: -1 });

    res.json({ devices });
  } catch (error) {
    console.error('Get IoT devices error:', error);
    res.status(500).json({ message: 'Failed to get IoT devices', error: error.message });
  }
});

// Get single IoT device
router.get('/:id', auth, async (req, res) => {
  try {
    const device = await IoTDevice.findOne({ 
      _id: req.params.id, 
      owner: req.userId, 
      isActive: true 
    }).populate('farm', 'name location');

    if (!device) {
      return res.status(404).json({ message: 'IoT device not found' });
    }

    res.json({ device });
  } catch (error) {
    console.error('Get IoT device error:', error);
    res.status(500).json({ message: 'Failed to get IoT device', error: error.message });
  }
});

// Create new IoT device
router.post('/', auth, async (req, res) => {
  try {
    // Verify farm ownership
    const farm = await Farm.findOne({ 
      _id: req.body.farm, 
      owner: req.userId, 
      isActive: true 
    });

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    const deviceData = {
      ...req.body,
      owner: req.userId,
      deviceId: req.body.deviceId || `DEV_${Date.now()}`
    };

    const device = new IoTDevice(deviceData);
    await device.save();

    const populatedDevice = await IoTDevice.findById(device._id).populate('farm', 'name location');

    res.status(201).json({
      message: 'IoT device created successfully',
      device: populatedDevice
    });
  } catch (error) {
    console.error('Create IoT device error:', error);
    res.status(500).json({ message: 'Failed to create IoT device', error: error.message });
  }
});

// Update IoT device
router.put('/:id', auth, async (req, res) => {
  try {
    const device = await IoTDevice.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId, isActive: true },
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('farm', 'name location');

    if (!device) {
      return res.status(404).json({ message: 'IoT device not found' });
    }

    res.json({
      message: 'IoT device updated successfully',
      device
    });
  } catch (error) {
    console.error('Update IoT device error:', error);
    res.status(500).json({ message: 'Failed to update IoT device', error: error.message });
  }
});

// Add reading to IoT device
router.post('/:id/readings', auth, async (req, res) => {
  try {
    const device = await IoTDevice.findOne({ 
      _id: req.params.id, 
      owner: req.userId, 
      isActive: true 
    });

    if (!device) {
      return res.status(404).json({ message: 'IoT device not found' });
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

    res.json({
      message: 'Reading added successfully',
      device
    });
  } catch (error) {
    console.error('Add reading error:', error);
    res.status(500).json({ message: 'Failed to add reading', error: error.message });
  }
});

// Get device readings
router.get('/:id/readings', auth, async (req, res) => {
  try {
    const { limit = 100, startDate, endDate } = req.query;

    const device = await IoTDevice.findOne({ 
      _id: req.params.id, 
      owner: req.userId, 
      isActive: true 
    });

    if (!device) {
      return res.status(404).json({ message: 'IoT device not found' });
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

    res.json({ readings });
  } catch (error) {
    console.error('Get readings error:', error);
    res.status(500).json({ message: 'Failed to get readings', error: error.message });
  }
});

// Add alert to IoT device
router.post('/:id/alerts', auth, async (req, res) => {
  try {
    const device = await IoTDevice.findOne({ 
      _id: req.params.id, 
      owner: req.userId, 
      isActive: true 
    });

    if (!device) {
      return res.status(404).json({ message: 'IoT device not found' });
    }

    const alert = {
      ...req.body,
      timestamp: new Date()
    };

    device.alerts.push(alert);

    await device.save();

    res.json({
      message: 'Alert added successfully',
      device
    });
  } catch (error) {
    console.error('Add alert error:', error);
    res.status(500).json({ message: 'Failed to add alert', error: error.message });
  }
});

// Delete IoT device
router.delete('/:id', auth, async (req, res) => {
  try {
    const device = await IoTDevice.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { isActive: false },
      { new: true }
    );

    if (!device) {
      return res.status(404).json({ message: 'IoT device not found' });
    }

    res.json({ message: 'IoT device deleted successfully' });
  } catch (error) {
    console.error('Delete IoT device error:', error);
    res.status(500).json({ message: 'Failed to delete IoT device', error: error.message });
  }
});

export default router;
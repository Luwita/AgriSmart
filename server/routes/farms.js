import express from 'express';
import Farm from '../models/Farm.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all farms for user
router.get('/', auth, async (req, res) => {
  try {
    const farms = await Farm.find({ owner: req.userId, isActive: true })
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json({ farms });
  } catch (error) {
    console.error('Get farms error:', error);
    res.status(500).json({ message: 'Failed to get farms', error: error.message });
  }
});

// Get single farm
router.get('/:id', auth, async (req, res) => {
  try {
    const farm = await Farm.findOne({ 
      _id: req.params.id, 
      owner: req.userId, 
      isActive: true 
    }).populate('owner', 'name email');

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    res.json({ farm });
  } catch (error) {
    console.error('Get farm error:', error);
    res.status(500).json({ message: 'Failed to get farm', error: error.message });
  }
});

// Create new farm
router.post('/', auth, async (req, res) => {
  try {
    const farmData = {
      ...req.body,
      owner: req.userId
    };

    const farm = new Farm(farmData);
    await farm.save();

    const populatedFarm = await Farm.findById(farm._id).populate('owner', 'name email');

    res.status(201).json({
      message: 'Farm created successfully',
      farm: populatedFarm
    });
  } catch (error) {
    console.error('Create farm error:', error);
    res.status(500).json({ message: 'Failed to create farm', error: error.message });
  }
});

// Update farm
router.put('/:id', auth, async (req, res) => {
  try {
    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId, isActive: true },
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('owner', 'name email');

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    res.json({
      message: 'Farm updated successfully',
      farm
    });
  } catch (error) {
    console.error('Update farm error:', error);
    res.status(500).json({ message: 'Failed to update farm', error: error.message });
  }
});

// Delete farm
router.delete('/:id', auth, async (req, res) => {
  try {
    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { isActive: false },
      { new: true }
    );

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    res.json({ message: 'Farm deleted successfully' });
  } catch (error) {
    console.error('Delete farm error:', error);
    res.status(500).json({ message: 'Failed to delete farm', error: error.message });
  }
});

export default router;
import express from 'express';
import Crop from '../models/Crop.js';
import Farm from '../models/Farm.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all crops for user
router.get('/', auth, async (req, res) => {
  try {
    const crops = await Crop.find({ owner: req.userId, isActive: true })
      .populate('farm', 'name location')
      .sort({ createdAt: -1 });

    res.json({ crops });
  } catch (error) {
    console.error('Get crops error:', error);
    res.status(500).json({ message: 'Failed to get crops', error: error.message });
  }
});

// Get single crop
router.get('/:id', auth, async (req, res) => {
  try {
    const crop = await Crop.findOne({ 
      _id: req.params.id, 
      owner: req.userId, 
      isActive: true 
    }).populate('farm', 'name location');

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.json({ crop });
  } catch (error) {
    console.error('Get crop error:', error);
    res.status(500).json({ message: 'Failed to get crop', error: error.message });
  }
});

// Create new crop
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

    const cropData = {
      ...req.body,
      owner: req.userId
    };

    const crop = new Crop(cropData);
    await crop.save();

    const populatedCrop = await Crop.findById(crop._id).populate('farm', 'name location');

    res.status(201).json({
      message: 'Crop created successfully',
      crop: populatedCrop
    });
  } catch (error) {
    console.error('Create crop error:', error);
    res.status(500).json({ message: 'Failed to create crop', error: error.message });
  }
});

// Update crop
router.put('/:id', auth, async (req, res) => {
  try {
    const crop = await Crop.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId, isActive: true },
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('farm', 'name location');

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.json({
      message: 'Crop updated successfully',
      crop
    });
  } catch (error) {
    console.error('Update crop error:', error);
    res.status(500).json({ message: 'Failed to update crop', error: error.message });
  }
});

// Add activity to crop
router.post('/:id/activities', auth, async (req, res) => {
  try {
    const crop = await Crop.findOne({ 
      _id: req.params.id, 
      owner: req.userId, 
      isActive: true 
    });

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    crop.activities.push({
      ...req.body,
      date: new Date()
    });

    await crop.save();

    res.json({
      message: 'Activity added successfully',
      crop
    });
  } catch (error) {
    console.error('Add activity error:', error);
    res.status(500).json({ message: 'Failed to add activity', error: error.message });
  }
});

// Delete crop
router.delete('/:id', auth, async (req, res) => {
  try {
    const crop = await Crop.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { isActive: false },
      { new: true }
    );

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.json({ message: 'Crop deleted successfully' });
  } catch (error) {
    console.error('Delete crop error:', error);
    res.status(500).json({ message: 'Failed to delete crop', error: error.message });
  }
});

export default router;
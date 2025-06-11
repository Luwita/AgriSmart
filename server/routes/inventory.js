import express from 'express';
import Inventory from '../models/Inventory.js';
import Farm from '../models/Farm.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all inventory items for user
router.get('/', auth, async (req, res) => {
  try {
    const { category, status } = req.query;
    
    let filter = { owner: req.userId, isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (status && status !== 'all') {
      filter.status = status;
    }

    const items = await Inventory.find(filter)
      .populate('farm', 'name location')
      .sort({ createdAt: -1 });

    res.json({ items });
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ message: 'Failed to get inventory', error: error.message });
  }
});

// Get single inventory item
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Inventory.findOne({ 
      _id: req.params.id, 
      owner: req.userId, 
      isActive: true 
    }).populate('farm', 'name location');

    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json({ item });
  } catch (error) {
    console.error('Get inventory item error:', error);
    res.status(500).json({ message: 'Failed to get inventory item', error: error.message });
  }
});

// Create new inventory item
router.post('/', auth, async (req, res) => {
  try {
    // Verify farm ownership if farm is specified
    if (req.body.farm) {
      const farm = await Farm.findOne({ 
        _id: req.body.farm, 
        owner: req.userId, 
        isActive: true 
      });

      if (!farm) {
        return res.status(404).json({ message: 'Farm not found' });
      }
    }

    const itemData = {
      ...req.body,
      owner: req.userId
    };

    const item = new Inventory(itemData);
    await item.save();

    const populatedItem = await Inventory.findById(item._id).populate('farm', 'name location');

    res.status(201).json({
      message: 'Inventory item created successfully',
      item: populatedItem
    });
  } catch (error) {
    console.error('Create inventory error:', error);
    res.status(500).json({ message: 'Failed to create inventory item', error: error.message });
  }
});

// Update inventory item
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Inventory.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId, isActive: true },
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('farm', 'name location');

    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json({
      message: 'Inventory item updated successfully',
      item
    });
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({ message: 'Failed to update inventory item', error: error.message });
  }
});

// Add transaction to inventory item
router.post('/:id/transactions', auth, async (req, res) => {
  try {
    const item = await Inventory.findOne({ 
      _id: req.params.id, 
      owner: req.userId, 
      isActive: true 
    });

    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
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

    res.json({
      message: 'Transaction added successfully',
      item
    });
  } catch (error) {
    console.error('Add transaction error:', error);
    res.status(500).json({ message: 'Failed to add transaction', error: error.message });
  }
});

// Get low stock alerts
router.get('/alerts/low-stock', auth, async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({
      owner: req.userId,
      isActive: true,
      status: { $in: ['low_stock', 'critical', 'out_of_stock'] }
    }).populate('farm', 'name location');

    res.json({ items: lowStockItems });
  } catch (error) {
    console.error('Get low stock alerts error:', error);
    res.status(500).json({ message: 'Failed to get low stock alerts', error: error.message });
  }
});

// Delete inventory item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Inventory.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { isActive: false },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Delete inventory error:', error);
    res.status(500).json({ message: 'Failed to delete inventory item', error: error.message });
  }
});

export default router;
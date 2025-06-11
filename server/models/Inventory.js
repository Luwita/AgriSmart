import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['seeds', 'fertilizers', 'pesticides', 'equipment', 'fuel', 'spare_parts', 'storage', 'harvest']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true
  },
  costPerUnit: Number,
  totalValue: Number,
  supplier: String,
  purchaseDate: Date,
  expiryDate: Date,
  location: String,
  minStockLevel: {
    type: Number,
    default: 0
  },
  batchNumber: String,
  description: String,
  status: {
    type: String,
    enum: ['in_stock', 'low_stock', 'critical', 'out_of_stock'],
    default: 'in_stock'
  },
  transactions: [{
    type: {
      type: String,
      enum: ['purchase', 'usage', 'sale', 'waste', 'transfer']
    },
    quantity: Number,
    date: {
      type: Date,
      default: Date.now
    },
    reference: String,
    notes: String
  }],
  qualityChecks: [{
    date: Date,
    quality: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor']
    },
    notes: String,
    inspector: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Update status based on quantity and min stock level
inventorySchema.pre('save', function(next) {
  if (this.quantity === 0) {
    this.status = 'out_of_stock';
  } else if (this.quantity <= this.minStockLevel * 0.5) {
    this.status = 'critical';
  } else if (this.quantity <= this.minStockLevel) {
    this.status = 'low_stock';
  } else {
    this.status = 'in_stock';
  }
  
  // Calculate total value
  if (this.costPerUnit) {
    this.totalValue = this.quantity * this.costPerUnit;
  }
  
  next();
});

export default mongoose.model('Inventory', inventorySchema);
import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
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
  localName: String,
  variety: String,
  field: String,
  area: {
    type: Number,
    required: true
  },
  plantingDate: {
    type: Date,
    required: true
  },
  expectedHarvest: Date,
  actualHarvest: Date,
  growthStage: {
    type: String,
    enum: ['Germination', 'Vegetative', 'Flowering', 'Tasseling', 'Pod Development', 'Pegging', 'Maturity']
  },
  health: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  yieldPrediction: Number,
  actualYield: Number,
  status: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor'],
    default: 'good'
  },
  activities: [{
    type: String,
    date: Date,
    description: String,
    cost: Number,
    notes: String
  }],
  inputs: {
    seeds: {
      variety: String,
      quantity: Number,
      cost: Number,
      supplier: String
    },
    fertilizers: [{
      type: String,
      quantity: Number,
      applicationDate: Date,
      cost: Number
    }],
    pesticides: [{
      type: String,
      quantity: Number,
      applicationDate: Date,
      targetPest: String,
      cost: Number
    }]
  },
  weather: {
    totalRainfall: Number,
    averageTemperature: Number,
    extremeWeatherEvents: [String]
  },
  economics: {
    totalCost: Number,
    revenue: Number,
    profit: Number,
    profitMargin: Number
  },
  sustainability: {
    waterUsage: Number,
    carbonFootprint: Number,
    soilHealthScore: Number,
    biodiversityScore: Number
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Calculate days to harvest
cropSchema.virtual('daysToHarvest').get(function() {
  if (!this.expectedHarvest) return null;
  const today = new Date();
  const harvest = new Date(this.expectedHarvest);
  const diffTime = harvest - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

export default mongoose.model('Crop', cropSchema);
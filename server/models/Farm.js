import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true,
    enum: [
      'Central Province',
      'Copperbelt Province', 
      'Eastern Province',
      'Luapula Province',
      'Lusaka Province',
      'Muchinga Province',
      'Northern Province',
      'North-Western Province',
      'Southern Province',
      'Western Province'
    ]
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  totalArea: {
    type: Number,
    required: true
  },
  soilType: String,
  waterSource: String,
  establishedYear: Number,
  certification: String,
  farmingType: {
    type: String,
    enum: ['Subsistence', 'Commercial', 'Mixed farming', 'Organic', 'Contract farming']
  },
  blocks: [{
    name: String,
    area: Number,
    soilType: String,
    currentCrop: String,
    lastPlanted: Date,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  }],
  infrastructure: {
    irrigation: {
      type: String,
      enum: ['None', 'Drip', 'Sprinkler', 'Flood', 'Treadle pump']
    },
    storage: [{
      type: String,
      capacity: Number,
      condition: String
    }],
    equipment: [{
      name: String,
      type: String,
      condition: String,
      purchaseDate: Date
    }]
  },
  performance: {
    totalYield: Number,
    profitMargin: Number,
    sustainabilityScore: Number,
    efficiency: Number
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Farm', farmSchema);
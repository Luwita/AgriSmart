import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
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
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  contact: {
    phone: String,
    email: String,
    address: String
  },
  crops: [{
    name: String,
    price: Number,
    unit: String,
    demand: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent', 'guaranteed']
    },
    quality: String,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
  marketType: {
    type: String,
    enum: ['local', 'regional', 'export', 'government']
  },
  operatingHours: String,
  facilities: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Market', marketSchema);
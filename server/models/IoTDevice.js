import mongoose from 'mongoose';

const iotDeviceSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
    enum: ['Soil Monitor', 'Weather Monitor', 'Irrigation System', 'Pest Monitor', 'Aerial Monitor', 'Soil Nutrient']
  },
  location: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  deviceId: {
    type: String,
    unique: true,
    required: true
  },
  manufacturer: String,
  model: String,
  serialNumber: String,
  installDate: Date,
  status: {
    type: String,
    enum: ['online', 'offline', 'active', 'charging', 'maintenance'],
    default: 'offline'
  },
  battery: {
    type: Number,
    min: 0,
    max: 100
  },
  signalStrength: {
    type: Number,
    min: 0,
    max: 100
  },
  networkType: {
    type: String,
    enum: ['WiFi', '4G LTE', 'LoRaWAN', 'Bluetooth', 'Ethernet']
  },
  powerSource: String,
  firmware: String,
  lastUpdate: {
    type: Date,
    default: Date.now
  },
  readings: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    data: mongoose.Schema.Types.Mixed,
    quality: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
      default: 'good'
    }
  }],
  alerts: [{
    type: String,
    message: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    resolved: {
      type: Boolean,
      default: false
    }
  }],
  maintenance: {
    lastMaintenance: Date,
    nextMaintenance: Date,
    maintenanceSchedule: String,
    calibrationDate: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('IoTDevice', iotDeviceSchema);
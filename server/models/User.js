import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['farmer', 'extension_officer', 'cooperative', 'admin'],
    default: 'farmer'
  },
  farmProfile: {
    farmName: String,
    location: String,
    province: {
      type: String,
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
    totalArea: Number,
    coordinates: String,
    soilType: String,
    waterSource: String,
    establishedYear: Number,
    certification: String,
    mainCrops: [String],
    farmingType: String
  },
  preferences: {
    language: {
      type: String,
      enum: ['English', 'Bemba', 'Nyanja', 'Tonga'],
      default: 'English'
    },
    currency: {
      type: String,
      default: 'ZMW'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free'
    },
    expiresAt: Date,
    paymentStatus: {
      type: String,
      enum: ['active', 'pending', 'cancelled'],
      default: 'active'
    }
  },
  stats: {
    reputation: {
      type: Number,
      default: 0
    },
    postsCreated: {
      type: Number,
      default: 0
    },
    helpfulAnswers: {
      type: Number,
      default: 0
    },
    coursesCompleted: {
      type: Number,
      default: 0
    },
    certificationsEarned: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  emailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model('User', userSchema);
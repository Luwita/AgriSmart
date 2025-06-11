import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import farmRoutes from './routes/farms.js';
import cropRoutes from './routes/crops.js';
import weatherRoutes from './routes/weather.js';
import marketRoutes from './routes/market.js';
import iotRoutes from './routes/iot.js';
import inventoryRoutes from './routes/inventory.js';
import analyticsRoutes from './routes/analytics.js';
import communityRoutes from './routes/community.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with graceful fallback
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrismart';
    
    // Set connection timeout to fail faster
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      connectTimeoutMS: 10000,
    });
    
    console.log(`🇿🇲 AgriSmart MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed:', error.message);
    console.log('📝 Running in demo mode without database persistence');
    console.log('💡 To enable full functionality, ensure MongoDB is running or provide a valid MONGODB_URI');
    return false;
  }
};

// Global variable to track database status
let isDatabaseConnected = false;

// Middleware to check database connection
const checkDatabaseConnection = (req, res, next) => {
  if (!isDatabaseConnected && req.method !== 'GET') {
    return res.status(503).json({
      message: 'Database not available - running in demo mode',
      error: 'MongoDB connection required for write operations'
    });
  }
  next();
};

// Routes with database check middleware for write operations
app.use('/api/auth', checkDatabaseConnection, authRoutes);
app.use('/api/farms', checkDatabaseConnection, farmRoutes);
app.use('/api/crops', checkDatabaseConnection, cropRoutes);
app.use('/api/weather', weatherRoutes); // Weather can work without DB
app.use('/api/market', marketRoutes); // Market data can work without DB
app.use('/api/iot', checkDatabaseConnection, iotRoutes);
app.use('/api/inventory', checkDatabaseConnection, inventoryRoutes);
app.use('/api/analytics', analyticsRoutes); // Analytics can provide demo data
app.use('/api/community', checkDatabaseConnection, communityRoutes);
app.use('/api/admin', checkDatabaseConnection, adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '🇿🇲 AgriSmart API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: isDatabaseConnected,
      status: isDatabaseConnected ? 'Connected' : 'Disconnected - Demo Mode'
    }
  });
});

// Database status endpoint
app.get('/api/database/status', (req, res) => {
  res.json({
    connected: isDatabaseConnected,
    status: isDatabaseConnected ? 'Connected' : 'Disconnected',
    message: isDatabaseConnected 
      ? 'Database is connected and ready' 
      : 'Running in demo mode. Some features may be limited.',
    mongooseReadyState: mongoose.connection.readyState,
    readyStates: {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Start server
const startServer = async () => {
  // Try to connect to database but don't fail if it's not available
  isDatabaseConnected = await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 AgriSmart Server running on port ${PORT}`);
    console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Database Status: http://localhost:${PORT}/api/database/status`);
    
    if (!isDatabaseConnected) {
      console.log('');
      console.log('🔧 SETUP INSTRUCTIONS:');
      console.log('   To enable full functionality, start MongoDB:');
      console.log('   • Install MongoDB: https://docs.mongodb.com/manual/installation/');
      console.log('   • Start MongoDB: mongod');
      console.log('   • Or set MONGODB_URI environment variable to a remote MongoDB instance');
      console.log('');
    }
  });
};

startServer();
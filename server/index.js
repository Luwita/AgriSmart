import express from 'express';
import cors from 'cors';
import dot from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
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
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Load environment variables
dot.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global variable to track database status
let isDatabaseConnected = false;

// Connect to database
const initializeDatabase = async () => {
  isDatabaseConnected = await connectDB();
};

// Initialize database connection
initializeDatabase();

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

// Routes
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
    mongooseReadyState: isDatabaseConnected ? 1 : 0,
    readyStates: {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }
  });
});

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AgriSmart Server running on port ${PORT}`);
  console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🗄️ Database Status: http://localhost:${PORT}/api/database/status`);

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

export default app;
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Farm from '../models/Farm.js';
import Crop from '../models/Crop.js';
import IoTDevice from '../models/IoTDevice.js';
import Inventory from '../models/Inventory.js';
import CommunityPost from '../models/CommunityPost.js';

dotenv.config();

// Connect to database
const initializeDatabase = async () => {
  try {
    await connectDB();
    console.log('🔌 Connected to MongoDB for seeding');
    
    // Clear existing data
    await User.deleteMany({});
    await Farm.deleteMany({});
    await Crop.deleteMany({});
    await IoTDevice.deleteMany({});
    await Inventory.deleteMany({});
    await CommunityPost.deleteMany({});
    
    console.log('🧹 Cleared existing data');
    
    // Create users
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('password123', 10);
    
    const admin = await User.create({
      name: 'System Administrator',
      email: 'admin@agrismart.zm',
      password: adminPassword,
      phone: '+260 211 000 000',
      role: 'admin',
      preferences: {
        language: 'English',
        currency: 'ZMW',
        notifications: true,
        theme: 'light'
      },
      isActive: true,
      emailVerified: true,
      lastLogin: new Date()
    });
    
    const farmer = await User.create({
      name: 'James Mwanza',
      email: 'james@example.com',
      password: userPassword,
      phone: '+260 977 123 456',
      role: 'farmer',
      farmProfile: {
        farmName: 'Mwanza Family Farm',
        location: 'Chongwe District',
        province: 'Lusaka Province',
        totalArea: 25,
        coordinates: '-15.4067, 28.2871',
        soilType: 'Sandy loam',
        waterSource: 'Borehole + Seasonal streams',
        establishedYear: 2010,
        certification: 'Organic certified',
        mainCrops: ['Maize', 'Soybeans', 'Groundnuts']
      },
      preferences: {
        language: 'English',
        currency: 'ZMW',
        notifications: true,
        theme: 'light'
      },
      isActive: true,
      emailVerified: true,
      lastLogin: new Date()
    });
    
    const extensionOfficer = await User.create({
      name: 'Mary Banda',
      email: 'mary@example.com',
      password: userPassword,
      phone: '+260 966 789 012',
      role: 'extension_officer',
      farmProfile: {
        location: 'Lusaka',
        province: 'Lusaka Province'
      },
      preferences: {
        language: 'English',
        currency: 'ZMW',
        notifications: true,
        theme: 'light'
      },
      isActive: true,
      emailVerified: true,
      lastLogin: new Date()
    });
    
    console.log('👥 Created users');
    
    // Create farms
    const farm1 = await Farm.create({
      owner: farmer._id,
      name: 'Mwanza Family Farm',
      location: 'Chongwe District',
      province: 'Lusaka Province',
      coordinates: {
        latitude: -15.4067,
        longitude: 28.2871
      },
      totalArea: 25,
      soilType: 'Sandy loam',
      waterSource: 'Borehole + Seasonal streams',
      establishedYear: 2010,
      certification: 'Organic certified',
      farmingType: 'Mixed farming',
      blocks: [
        {
          name: 'Block A',
          area: 10,
          soilType: 'Sandy loam',
          currentCrop: 'Maize',
          lastPlanted: new Date('2024-11-15'),
          coordinates: {
            latitude: -15.4067,
            longitude: 28.2871
          }
        },
        {
          name: 'Block B',
          area: 8,
          soilType: 'Clay loam',
          currentCrop: 'Soybeans',
          lastPlanted: new Date('2024-12-01'),
          coordinates: {
            latitude: -15.4080,
            longitude: 28.2890
          }
        }
      ],
      infrastructure: {
        irrigation: 'Drip',
        storage: [
          {
            type: 'Grain silo',
            capacity: 50,
            condition: 'Good'
          }
        ],
        equipment: [
          {
            name: 'Tractor',
            type: 'Mechanized',
            condition: 'Good',
            purchaseDate: new Date('2020-05-15')
          }
        ]
      },
      performance: {
        totalYield: 156.8,
        profitMargin: 38.2,
        sustainabilityScore: 81,
        efficiency: 85
      },
      isActive: true
    });
    
    console.log('🚜 Created farms');
    
    // Create crops
    const crop1 = await Crop.create({
      farm: farm1._id,
      owner: farmer._id,
      name: 'Maize',
      localName: 'Chimanga',
      variety: 'SC627',
      field: 'Block A',
      area: 10,
      plantingDate: new Date('2024-11-15'),
      expectedHarvest: new Date('2025-05-15'),
      growthStage: 'Tasseling',
      health: 92,
      yieldPrediction: 6.5,
      status: 'excellent',
      activities: [
        {
          type: 'Planting',
          date: new Date('2024-11-15'),
          description: 'Initial planting',
          cost: 2500,
          notes: 'Used SC627 variety'
        },
        {
          type: 'Fertilizer',
          date: new Date('2024-12-15'),
          description: 'D-Compound application',
          cost: 3200,
          notes: '10 bags applied'
        }
      ],
      inputs: {
        seeds: {
          variety: 'SC627',
          quantity: 25,
          cost: 2500,
          supplier: 'Seed Co'
        },
        fertilizers: [
          {
            type: 'D-Compound',
            quantity: 500,
            applicationDate: new Date('2024-12-15'),
            cost: 3200
          }
        ],
        pesticides: [
          {
            type: 'Emamectin benzoate',
            quantity: 5,
            applicationDate: new Date('2024-12-20'),
            targetPest: 'Fall armyworm',
            cost: 850
          }
        ]
      },
      weather: {
        totalRainfall: 450,
        averageTemperature: 28,
        extremeWeatherEvents: []
      },
      economics: {
        totalCost: 12500,
        revenue: 42250,
        profit: 29750,
        profitMargin: 70.4
      },
      sustainability: {
        waterUsage: 2450,
        carbonFootprint: 1.8,
        soilHealthScore: 85,
        biodiversityScore: 72
      },
      isActive: true
    });
    
    const crop2 = await Crop.create({
      farm: farm1._id,
      owner: farmer._id,
      name: 'Soybeans',
      localName: 'Soya',
      variety: 'Soprano',
      field: 'Block B',
      area: 8,
      plantingDate: new Date('2024-12-01'),
      expectedHarvest: new Date('2025-04-30'),
      growthStage: 'Pod Development',
      health: 87,
      yieldPrediction: 2.2,
      status: 'good',
      activities: [
        {
          type: 'Planting',
          date: new Date('2024-12-01'),
          description: 'Initial planting',
          cost: 1800,
          notes: 'Used Soprano variety'
        }
      ],
      inputs: {
        seeds: {
          variety: 'Soprano',
          quantity: 20,
          cost: 1800,
          supplier: 'Seed Co'
        },
        fertilizers: [],
        pesticides: []
      },
      weather: {
        totalRainfall: 450,
        averageTemperature: 28,
        extremeWeatherEvents: []
      },
      economics: {
        totalCost: 8500,
        revenue: 0,
        profit: 0,
        profitMargin: 0
      },
      sustainability: {
        waterUsage: 1800,
        carbonFootprint: 1.2,
        soilHealthScore: 90,
        biodiversityScore: 78
      },
      isActive: true
    });
    
    console.log('🌱 Created crops');
    
    // Create IoT devices
    const device1 = await IoTDevice.create({
      farm: farm1._id,
      owner: farmer._id,
      name: 'Soil Sensor A1',
      type: 'Soil Monitor',
      location: 'Block A - North Section',
      coordinates: {
        latitude: -15.4067,
        longitude: 28.2871
      },
      deviceId: 'ST2000-001-ZM',
      manufacturer: 'AgroTech Solutions',
      model: 'ST-2000',
      serialNumber: 'ST2000-001-ZM',
      installDate: new Date('2024-01-15'),
      status: 'online',
      battery: 87,
      signalStrength: 85,
      networkType: 'LoRaWAN',
      powerSource: 'Solar + Battery',
      firmware: 'v2.1.3',
      lastUpdate: new Date(),
      readings: [
        {
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          data: {
            moisture: 68,
            temperature: 24,
            pH: 6.8,
            nutrients: 'Good'
          },
          quality: 'good'
        }
      ],
      alerts: [],
      maintenance: {
        lastMaintenance: new Date('2024-11-01'),
        nextMaintenance: new Date('2024-12-20'),
        maintenanceSchedule: 'Monthly',
        calibrationDate: new Date('2024-11-01')
      },
      isActive: true
    });
    
    const device2 = await IoTDevice.create({
      farm: farm1._id,
      owner: farmer._id,
      name: 'Weather Station B1',
      type: 'Weather Monitor',
      location: 'Block B - Central',
      coordinates: {
        latitude: -15.4080,
        longitude: 28.2890
      },
      deviceId: 'WP500-002-ZM',
      manufacturer: 'WeatherPro Zambia',
      model: 'WP-500',
      serialNumber: 'WP500-002-ZM',
      installDate: new Date('2024-02-10'),
      status: 'online',
      battery: 92,
      signalStrength: 92,
      networkType: '4G LTE',
      powerSource: 'Mains + UPS',
      firmware: 'v3.0.1',
      lastUpdate: new Date(),
      readings: [
        {
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          data: {
            temperature: 28,
            humidity: 65,
            windSpeed: 12,
            rainfall: 2.5
          },
          quality: 'excellent'
        }
      ],
      alerts: [],
      maintenance: {
        lastMaintenance: new Date('2024-10-15'),
        nextMaintenance: new Date('2024-12-25'),
        maintenanceSchedule: 'Monthly',
        calibrationDate: new Date('2024-10-15')
      },
      isActive: true
    });
    
    console.log('🔌 Created IoT devices');
    
    // Create inventory items
    const inventory1 = await Inventory.create({
      farm: farm1._id,
      owner: farmer._id,
      name: 'D-Compound Fertilizer',
      category: 'fertilizers',
      quantity: 25,
      unit: 'bags',
      costPerUnit: 280,
      totalValue: 7000,
      supplier: 'Zambia Fertilizer Company',
      purchaseDate: new Date('2024-10-15'),
      expiryDate: new Date('2025-10-15'),
      location: 'Main Storage',
      minStockLevel: 10,
      batchNumber: 'DCF-2024-001',
      description: '10-20-10 NPK fertilizer',
      status: 'in_stock',
      transactions: [
        {
          type: 'purchase',
          quantity: 25,
          date: new Date('2024-10-15'),
          reference: 'PO-2024-001',
          notes: 'Initial purchase'
        }
      ],
      qualityChecks: [
        {
          date: new Date('2024-10-15'),
          quality: 'excellent',
          notes: 'Sealed bags, no damage',
          inspector: 'James Mwanza'
        }
      ],
      isActive: true
    });
    
    const inventory2 = await Inventory.create({
      farm: farm1._id,
      owner: farmer._id,
      name: 'SC627 Maize Seeds',
      category: 'seeds',
      quantity: 15,
      unit: 'bags',
      costPerUnit: 250,
      totalValue: 3750,
      supplier: 'Seed Co',
      purchaseDate: new Date('2024-10-10'),
      expiryDate: new Date('2025-10-10'),
      location: 'Seed Storage',
      minStockLevel: 5,
      batchNumber: 'SC-2024-001',
      description: 'SC627 hybrid maize variety',
      status: 'in_stock',
      transactions: [
        {
          type: 'purchase',
          quantity: 25,
          date: new Date('2024-10-10'),
          reference: 'PO-2024-002',
          notes: 'Initial purchase'
        },
        {
          type: 'usage',
          quantity: 10,
          date: new Date('2024-11-15'),
          reference: 'USE-2024-001',
          notes: 'Block A planting'
        }
      ],
      qualityChecks: [
        {
          date: new Date('2024-10-10'),
          quality: 'excellent',
          notes: 'High germination rate',
          inspector: 'James Mwanza'
        }
      ],
      isActive: true
    });
    
    console.log('📦 Created inventory items');
    
    // Create community posts
    const post1 = await CommunityPost.create({
      author: farmer._id,
      title: 'Best practices for fall armyworm control?',
      content: 'I\'ve noticed some fall armyworm damage in my maize crop. What are the most effective control methods that other farmers are using this season?',
      category: 'pests',
      tags: ['maize', 'pests', 'fall armyworm'],
      likes: [],
      replies: [
        {
          author: extensionOfficer._id,
          content: 'For fall armyworm, I recommend using Emamectin benzoate at 200g/ha. Apply early morning or late evening for best results. Also consider crop rotation next season.',
          date: new Date(Date.now() - 12 * 60 * 60 * 1000),
          likes: []
        }
      ],
      views: 45,
      status: 'active',
      isActive: true
    });
    
    const post2 = await CommunityPost.create({
      author: extensionOfficer._id,
      title: 'FRA maize purchase program 2024-2025',
      content: 'The Food Reserve Agency has announced the maize purchase program for the 2024-2025 season. The price is set at ZMW 4,000 per ton. Registration starts next week at all district offices.',
      category: 'market',
      tags: ['maize', 'FRA', 'market'],
      likes: [
        {
          user: farmer._id,
          date: new Date(Date.now() - 6 * 60 * 60 * 1000)
        }
      ],
      replies: [],
      views: 120,
      status: 'pinned',
      isActive: true
    });
    
    console.log('💬 Created community posts');
    
    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

initializeDatabase();
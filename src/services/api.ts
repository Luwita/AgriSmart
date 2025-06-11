import axios from 'axios';

// Mock data storage using localStorage
const STORAGE_KEYS = {
  users: 'agrismart_users',
  farms: 'agrismart_farms',
  crops: 'agrismart_crops',
  devices: 'agrismart_devices',
  inventory: 'agrismart_inventory',
  posts: 'agrismart_posts',
  weather: 'agrismart_weather',
  market: 'agrismart_market'
};

// Utility functions for localStorage
const getStorageData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const setStorageData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Initialize mock data if not exists
const initializeMockData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    const mockUsers = [
      {
        _id: 'admin',
        name: 'System Administrator',
        email: 'admin@agrismart.zm',
        role: 'admin',
        farmProfile: { location: 'Lusaka', province: 'Lusaka Province' },
        stats: { reputation: 1000, postsCreated: 0 },
        isActive: true,
        createdAt: '2024-01-01',
        lastLogin: new Date().toISOString()
      },
      {
        _id: '1',
        name: 'James Mwanza',
        email: 'james@example.com',
        role: 'farmer',
        farmProfile: { location: 'Chongwe', province: 'Lusaka Province', totalArea: 25 },
        stats: { reputation: 245, postsCreated: 23 },
        isActive: true,
        createdAt: '2024-01-15',
        lastLogin: '2024-12-15'
      },
      {
        _id: '2',
        name: 'Mary Banda',
        email: 'mary@example.com',
        role: 'extension_officer',
        farmProfile: { location: 'Lusaka', province: 'Lusaka Province' },
        stats: { reputation: 567, postsCreated: 89 },
        isActive: true,
        createdAt: '2023-08-20',
        lastLogin: '2024-12-14'
      }
    ];
    setStorageData(STORAGE_KEYS.users, mockUsers);
  }

  if (!localStorage.getItem(STORAGE_KEYS.farms)) {
    const mockFarms = [
      {
        _id: '1',
        owner: '1',
        name: 'Mwanza Family Farm',
        location: 'Chongwe District',
        province: 'Lusaka Province',
        totalArea: 25,
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
    setStorageData(STORAGE_KEYS.farms, mockFarms);
  }

  if (!localStorage.getItem(STORAGE_KEYS.crops)) {
    const mockCrops = [
      {
        _id: '1',
        owner: '1',
        farm: '1',
        name: 'Maize',
        variety: 'SC627',
        area: 15,
        plantingDate: '2024-11-15',
        expectedHarvest: '2024-05-15',
        growthStage: 'Tasseling',
        health: 92,
        yieldPrediction: 6.5,
        status: 'excellent',
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
    setStorageData(STORAGE_KEYS.crops, mockCrops);
  }

  if (!localStorage.getItem(STORAGE_KEYS.devices)) {
    const mockDevices = [
      {
        _id: '1',
        owner: '1',
        farm: '1',
        name: 'Soil Sensor A1',
        type: 'Soil Monitor',
        status: 'online',
        battery: 87,
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
    setStorageData(STORAGE_KEYS.devices, mockDevices);
  }
};

// Initialize mock data
initializeMockData();

// Create axios instance for consistency
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock API responses
const mockResponse = (data: any, status = 200) => {
  return Promise.resolve({
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {}
  });
};

const mockError = (message: string, status = 500) => {
  return Promise.reject({
    response: {
      data: { message },
      status,
      statusText: 'Error'
    }
  });
};

// Auth API
export const authAPI = {
  login: (email: string, password: string) => {
    const users = getStorageData(STORAGE_KEYS.users);
    const user = users.find((u: any) => u.email === email);
    
    if (!user) {
      return mockError('User not found', 401);
    }
    
    // Simple password check (in production, use proper hashing)
    if ((email === 'admin@agrismart.zm' && password === 'admin123') || 
        (email !== 'admin@agrismart.zm' && password === 'password')) {
      
      // Update last login
      user.lastLogin = new Date().toISOString();
      const updatedUsers = users.map((u: any) => u._id === user._id ? user : u);
      setStorageData(STORAGE_KEYS.users, updatedUsers);
      
      return mockResponse({
        message: 'Login successful',
        token: 'mock_token_' + user._id,
        user
      });
    }
    
    return mockError('Invalid credentials', 401);
  },
  
  register: (userData: any) => {
    const users = getStorageData(STORAGE_KEYS.users);
    const existingUser = users.find((u: any) => u.email === userData.email);
    
    if (existingUser) {
      return mockError('User already exists', 400);
    }
    
    const newUser = {
      _id: generateId(),
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString(),
      stats: { reputation: 0, postsCreated: 0 }
    };
    
    users.push(newUser);
    setStorageData(STORAGE_KEYS.users, users);
    
    return mockResponse({
      message: 'User registered successfully',
      token: 'mock_token_' + newUser._id,
      user: newUser
    });
  },
  
  getProfile: () => {
    const token = localStorage.getItem('agrismart_token');
    if (!token) {
      return mockError('No token provided', 401);
    }
    
    const userId = token.replace('mock_token_', '');
    const users = getStorageData(STORAGE_KEYS.users);
    const user = users.find((u: any) => u._id === userId);
    
    if (!user) {
      return mockError('User not found', 404);
    }
    
    return mockResponse({ user });
  },
  
  updateProfile: (updates: any) => {
    const token = localStorage.getItem('agrismart_token');
    if (!token) {
      return mockError('No token provided', 401);
    }
    
    const userId = token.replace('mock_token_', '');
    const users = getStorageData(STORAGE_KEYS.users);
    const userIndex = users.findIndex((u: any) => u._id === userId);
    
    if (userIndex === -1) {
      return mockError('User not found', 404);
    }
    
    users[userIndex] = { ...users[userIndex], ...updates };
    setStorageData(STORAGE_KEYS.users, users);
    
    return mockResponse({
      message: 'Profile updated successfully',
      user: users[userIndex]
    });
  },
  
  changePassword: (currentPassword: string, newPassword: string) => {
    return mockResponse({ message: 'Password changed successfully' });
  },
};

// Farm API
export const farmAPI = {
  getFarms: () => {
    const farms = getStorageData(STORAGE_KEYS.farms);
    return mockResponse({ farms });
  },
  
  getFarm: (id: string) => {
    const farms = getStorageData(STORAGE_KEYS.farms);
    const farm = farms.find((f: any) => f._id === id);
    
    if (!farm) {
      return mockError('Farm not found', 404);
    }
    
    return mockResponse({ farm });
  },
  
  createFarm: (farmData: any) => {
    const farms = getStorageData(STORAGE_KEYS.farms);
    const newFarm = {
      _id: generateId(),
      ...farmData,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    farms.push(newFarm);
    setStorageData(STORAGE_KEYS.farms, farms);
    
    return mockResponse({
      message: 'Farm created successfully',
      farm: newFarm
    });
  },
  
  updateFarm: (id: string, updates: any) => {
    const farms = getStorageData(STORAGE_KEYS.farms);
    const farmIndex = farms.findIndex((f: any) => f._id === id);
    
    if (farmIndex === -1) {
      return mockError('Farm not found', 404);
    }
    
    farms[farmIndex] = { ...farms[farmIndex], ...updates };
    setStorageData(STORAGE_KEYS.farms, farms);
    
    return mockResponse({
      message: 'Farm updated successfully',
      farm: farms[farmIndex]
    });
  },
  
  deleteFarm: (id: string) => {
    const farms = getStorageData(STORAGE_KEYS.farms);
    const farmIndex = farms.findIndex((f: any) => f._id === id);
    
    if (farmIndex === -1) {
      return mockError('Farm not found', 404);
    }
    
    farms[farmIndex].isActive = false;
    setStorageData(STORAGE_KEYS.farms, farms);
    
    return mockResponse({ message: 'Farm deleted successfully' });
  },
};

// Crop API
export const cropAPI = {
  getCrops: () => {
    const crops = getStorageData(STORAGE_KEYS.crops);
    return mockResponse({ crops });
  },
  
  getCrop: (id: string) => {
    const crops = getStorageData(STORAGE_KEYS.crops);
    const crop = crops.find((c: any) => c._id === id);
    
    if (!crop) {
      return mockError('Crop not found', 404);
    }
    
    return mockResponse({ crop });
  },
  
  createCrop: (cropData: any) => {
    const crops = getStorageData(STORAGE_KEYS.crops);
    const newCrop = {
      _id: generateId(),
      ...cropData,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    crops.push(newCrop);
    setStorageData(STORAGE_KEYS.crops, crops);
    
    return mockResponse({
      message: 'Crop created successfully',
      crop: newCrop
    });
  },
  
  updateCrop: (id: string, updates: any) => {
    const crops = getStorageData(STORAGE_KEYS.crops);
    const cropIndex = crops.findIndex((c: any) => c._id === id);
    
    if (cropIndex === -1) {
      return mockError('Crop not found', 404);
    }
    
    crops[cropIndex] = { ...crops[cropIndex], ...updates };
    setStorageData(STORAGE_KEYS.crops, crops);
    
    return mockResponse({
      message: 'Crop updated successfully',
      crop: crops[cropIndex]
    });
  },
  
  addActivity: (id: string, activity: any) => {
    const crops = getStorageData(STORAGE_KEYS.crops);
    const cropIndex = crops.findIndex((c: any) => c._id === id);
    
    if (cropIndex === -1) {
      return mockError('Crop not found', 404);
    }
    
    if (!crops[cropIndex].activities) {
      crops[cropIndex].activities = [];
    }
    
    crops[cropIndex].activities.push({
      ...activity,
      date: new Date().toISOString()
    });
    
    setStorageData(STORAGE_KEYS.crops, crops);
    
    return mockResponse({
      message: 'Activity added successfully',
      crop: crops[cropIndex]
    });
  },
  
  deleteCrop: (id: string) => {
    const crops = getStorageData(STORAGE_KEYS.crops);
    const cropIndex = crops.findIndex((c: any) => c._id === id);
    
    if (cropIndex === -1) {
      return mockError('Crop not found', 404);
    }
    
    crops[cropIndex].isActive = false;
    setStorageData(STORAGE_KEYS.crops, crops);
    
    return mockResponse({ message: 'Crop deleted successfully' });
  },
};

// IoT API
export const iotAPI = {
  getDevices: () => {
    const devices = getStorageData(STORAGE_KEYS.devices);
    return mockResponse({ devices });
  },
  
  getDevice: (id: string) => {
    const devices = getStorageData(STORAGE_KEYS.devices);
    const device = devices.find((d: any) => d._id === id);
    
    if (!device) {
      return mockError('Device not found', 404);
    }
    
    return mockResponse({ device });
  },
  
  createDevice: (deviceData: any) => {
    const devices = getStorageData(STORAGE_KEYS.devices);
    const newDevice = {
      _id: generateId(),
      ...deviceData,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    devices.push(newDevice);
    setStorageData(STORAGE_KEYS.devices, devices);
    
    return mockResponse({
      message: 'Device created successfully',
      device: newDevice
    });
  },
  
  updateDevice: (id: string, updates: any) => {
    const devices = getStorageData(STORAGE_KEYS.devices);
    const deviceIndex = devices.findIndex((d: any) => d._id === id);
    
    if (deviceIndex === -1) {
      return mockError('Device not found', 404);
    }
    
    devices[deviceIndex] = { ...devices[deviceIndex], ...updates };
    setStorageData(STORAGE_KEYS.devices, devices);
    
    return mockResponse({
      message: 'Device updated successfully',
      device: devices[deviceIndex]
    });
  },
  
  addReading: (id: string, reading: any) => {
    const devices = getStorageData(STORAGE_KEYS.devices);
    const deviceIndex = devices.findIndex((d: any) => d._id === id);
    
    if (deviceIndex === -1) {
      return mockError('Device not found', 404);
    }
    
    if (!devices[deviceIndex].readings) {
      devices[deviceIndex].readings = [];
    }
    
    devices[deviceIndex].readings.push({
      ...reading,
      timestamp: new Date().toISOString()
    });
    
    setStorageData(STORAGE_KEYS.devices, devices);
    
    return mockResponse({
      message: 'Reading added successfully',
      device: devices[deviceIndex]
    });
  },
  
  getReadings: (id: string, params?: any) => {
    const devices = getStorageData(STORAGE_KEYS.devices);
    const device = devices.find((d: any) => d._id === id);
    
    if (!device) {
      return mockError('Device not found', 404);
    }
    
    const readings = device.readings || [];
    return mockResponse({ readings });
  },
  
  addAlert: (id: string, alert: any) => {
    const devices = getStorageData(STORAGE_KEYS.devices);
    const deviceIndex = devices.findIndex((d: any) => d._id === id);
    
    if (deviceIndex === -1) {
      return mockError('Device not found', 404);
    }
    
    if (!devices[deviceIndex].alerts) {
      devices[deviceIndex].alerts = [];
    }
    
    devices[deviceIndex].alerts.push({
      ...alert,
      timestamp: new Date().toISOString()
    });
    
    setStorageData(STORAGE_KEYS.devices, devices);
    
    return mockResponse({
      message: 'Alert added successfully',
      device: devices[deviceIndex]
    });
  },
  
  deleteDevice: (id: string) => {
    const devices = getStorageData(STORAGE_KEYS.devices);
    const deviceIndex = devices.findIndex((d: any) => d._id === id);
    
    if (deviceIndex === -1) {
      return mockError('Device not found', 404);
    }
    
    devices[deviceIndex].isActive = false;
    setStorageData(STORAGE_KEYS.devices, devices);
    
    return mockResponse({ message: 'Device deleted successfully' });
  },
};

// Inventory API
export const inventoryAPI = {
  getItems: (params?: any) => {
    const items = getStorageData(STORAGE_KEYS.inventory);
    return mockResponse({ items });
  },
  
  getItem: (id: string) => {
    const items = getStorageData(STORAGE_KEYS.inventory);
    const item = items.find((i: any) => i._id === id);
    
    if (!item) {
      return mockError('Item not found', 404);
    }
    
    return mockResponse({ item });
  },
  
  createItem: (itemData: any) => {
    const items = getStorageData(STORAGE_KEYS.inventory);
    const newItem = {
      _id: generateId(),
      ...itemData,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    items.push(newItem);
    setStorageData(STORAGE_KEYS.inventory, items);
    
    return mockResponse({
      message: 'Item created successfully',
      item: newItem
    });
  },
  
  updateItem: (id: string, updates: any) => {
    const items = getStorageData(STORAGE_KEYS.inventory);
    const itemIndex = items.findIndex((i: any) => i._id === id);
    
    if (itemIndex === -1) {
      return mockError('Item not found', 404);
    }
    
    items[itemIndex] = { ...items[itemIndex], ...updates };
    setStorageData(STORAGE_KEYS.inventory, items);
    
    return mockResponse({
      message: 'Item updated successfully',
      item: items[itemIndex]
    });
  },
  
  addTransaction: (id: string, transaction: any) => {
    const items = getStorageData(STORAGE_KEYS.inventory);
    const itemIndex = items.findIndex((i: any) => i._id === id);
    
    if (itemIndex === -1) {
      return mockError('Item not found', 404);
    }
    
    if (!items[itemIndex].transactions) {
      items[itemIndex].transactions = [];
    }
    
    items[itemIndex].transactions.push({
      ...transaction,
      date: new Date().toISOString()
    });
    
    setStorageData(STORAGE_KEYS.inventory, items);
    
    return mockResponse({
      message: 'Transaction added successfully',
      item: items[itemIndex]
    });
  },
  
  getLowStockAlerts: () => {
    const items = getStorageData(STORAGE_KEYS.inventory);
    const lowStockItems = items.filter((item: any) => 
      item.status === 'low_stock' || item.status === 'critical' || item.status === 'out_of_stock'
    );
    
    return mockResponse({ items: lowStockItems });
  },
  
  deleteItem: (id: string) => {
    const items = getStorageData(STORAGE_KEYS.inventory);
    const itemIndex = items.findIndex((i: any) => i._id === id);
    
    if (itemIndex === -1) {
      return mockError('Item not found', 404);
    }
    
    items[itemIndex].isActive = false;
    setStorageData(STORAGE_KEYS.inventory, items);
    
    return mockResponse({ message: 'Item deleted successfully' });
  },
};

// Weather API
export const weatherAPI = {
  getCurrentWeather: (params?: any) => {
    const weatherData = {
      current: {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        pressure: 1013,
        visibility: 10,
        uvIndex: 6,
        condition: 'Partly Cloudy',
        rainfall: 2.5
      },
      forecast: [
        { day: 'Today', high: 30, low: 20, condition: 'Partly Cloudy', rain: 25 },
        { day: 'Tomorrow', high: 29, low: 19, condition: 'Cloudy', rain: 40 },
        { day: 'Friday', high: 26, low: 17, condition: 'Rainy', rain: 80 }
      ],
      alerts: [],
      province: params?.province || 'Lusaka Province',
      lastUpdated: new Date().toISOString()
    };
    
    return mockResponse({ weather: weatherData });
  },
  
  getHistoricalWeather: (params?: any) => {
    const historicalData = {
      province: params?.province || 'Lusaka Province',
      period: { startDate: params?.startDate, endDate: params?.endDate },
      data: [
        { date: '2024-12-01', temperature: 27, rainfall: 5.2, humidity: 68 },
        { date: '2024-12-02', temperature: 29, rainfall: 0.0, humidity: 62 },
        { date: '2024-12-03', temperature: 31, rainfall: 0.0, humidity: 58 }
      ]
    };
    
    return mockResponse({ historical: historicalData });
  },
};

// Market API
export const marketAPI = {
  getPrices: (params?: any) => {
    const marketPrices = {
      maize: {
        current: 4250,
        change: 12.5,
        trend: 'up',
        unit: 'per ton (ZMW)',
        fraPrice: 4000,
        exportPrice: 4800
      },
      soybeans: {
        current: 6800,
        change: -3.2,
        trend: 'down',
        unit: 'per ton (ZMW)',
        fraPrice: null,
        exportPrice: 7200
      }
    };
    
    const crop = params?.crop;
    const prices = crop ? { [crop]: marketPrices[crop as keyof typeof marketPrices] } : marketPrices;
    
    return mockResponse({
      prices,
      lastUpdated: new Date().toISOString(),
      province: params?.province || 'All Provinces'
    });
  },
  
  getBuyers: (params?: any) => {
    const buyers = [
      {
        name: 'Zambeef Products PLC',
        type: 'processor',
        location: 'Lusaka',
        cropsWanted: ['maize', 'soybeans'],
        priceOffered: 4500,
        quantityNeeded: '500+ tons',
        paymentTerms: 'Cash on delivery',
        contact: '+260 211 256 354',
        verified: true,
        rating: 5
      }
    ];
    
    return mockResponse({ buyers });
  },
  
  getAnalysis: (params?: any) => {
    const analysis = {
      crop: params?.crop || 'maize',
      timeframe: params?.timeframe || '30days',
      trends: {
        priceDirection: 'increasing',
        demandLevel: 'high',
        supplyLevel: 'medium',
        seasonalFactor: 'peak_harvest'
      },
      insights: [
        {
          title: 'FRA Purchase Program',
          description: 'Government guaranteed purchase at ZMW 4,000/ton',
          impact: 'positive',
          recommendation: 'Prepare quality certificates'
        }
      ],
      forecast: {
        nextMonth: 'stable_to_rising',
        confidence: 78,
        factors: ['seasonal_demand', 'export_opportunities', 'government_policy']
      }
    };
    
    return mockResponse({ analysis });
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params?: any) => {
    const farms = getStorageData(STORAGE_KEYS.farms);
    const crops = getStorageData(STORAGE_KEYS.crops);
    const inventory = getStorageData(STORAGE_KEYS.inventory);
    
    const analytics = {
      overview: {
        totalFarms: farms.length,
        totalCrops: crops.length,
        totalArea: farms.reduce((sum: number, farm: any) => sum + (farm.totalArea || 0), 0),
        totalYield: crops.reduce((sum: number, crop: any) => sum + (crop.actualYield || 0), 0)
      },
      performance: {
        averageYield: crops.length > 0 ? crops.reduce((sum: number, crop: any) => sum + (crop.actualYield || 0), 0) / crops.length : 0,
        profitMargin: 38.2,
        efficiency: 85.4,
        sustainabilityScore: 78.9
      },
      inventory: {
        totalItems: inventory.length,
        totalValue: inventory.reduce((sum: number, item: any) => sum + (item.totalValue || 0), 0),
        lowStockItems: inventory.filter((item: any) => item.status === 'low_stock' || item.status === 'critical').length,
        categories: inventory.reduce((acc: any, item: any) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {})
      },
      trends: {
        yieldTrend: 'increasing',
        profitTrend: 'stable',
        efficiencyTrend: 'increasing'
      },
      timeframe: params?.timeframe || '30days',
      lastUpdated: new Date().toISOString()
    };
    
    return mockResponse({ analytics });
  },
  
  getCropAnalytics: (params?: any) => {
    const crops = getStorageData(STORAGE_KEYS.crops);
    
    const analytics = {
      crops: crops.map((crop: any) => ({
        id: crop._id,
        name: crop.name,
        variety: crop.variety,
        area: crop.area,
        plantingDate: crop.plantingDate,
        expectedHarvest: crop.expectedHarvest,
        growthStage: crop.growthStage,
        health: crop.health,
        yieldPrediction: crop.yieldPrediction,
        actualYield: crop.actualYield,
        status: crop.status
      })),
      summary: {
        totalCrops: crops.length,
        totalArea: crops.reduce((sum: number, crop: any) => sum + (crop.area || 0), 0),
        averageHealth: crops.length > 0 ? crops.reduce((sum: number, crop: any) => sum + (crop.health || 0), 0) / crops.length : 0,
        totalPredictedYield: crops.reduce((sum: number, crop: any) => sum + (crop.yieldPrediction || 0), 0),
        totalActualYield: crops.reduce((sum: number, crop: any) => sum + (crop.actualYield || 0), 0)
      },
      timeframe: params?.timeframe || '30days',
      lastUpdated: new Date().toISOString()
    };
    
    return mockResponse({ analytics });
  },
  
  getFinancialAnalytics: (params?: any) => {
    const analytics = {
      summary: {
        totalRevenue: 68500,
        totalCosts: 42300,
        totalProfit: 26200,
        profitMargin: 38.2,
        inventoryValue: 15600
      },
      breakdown: {
        revenueByMonth: [],
        expensesByCategory: {
          seeds: 5000,
          fertilizers: 8000,
          pesticides: 3000
        }
      },
      trends: {
        revenueGrowth: 12.5,
        costOptimization: -8.3,
        profitImprovement: 25.7
      },
      timeframe: params?.timeframe || '30days',
      lastUpdated: new Date().toISOString()
    };
    
    return mockResponse({ analytics });
  },
  
  generateReport: (reportData: any) => {
    const reportId = `RPT_${Date.now()}`;
    
    return mockResponse({
      message: 'Report generated successfully',
      reportId,
      downloadUrl: `/api/analytics/reports/${reportId}/download`,
      reportData: {
        title: reportData.title || 'Farm Performance Report',
        generatedAt: new Date().toISOString(),
        ...reportData
      }
    });
  },
  
  configureAlert: (alertData: any) => {
    const alertConfig = {
      id: `ALERT_${Date.now()}`,
      ...alertData,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    return mockResponse({
      message: 'Alert configured successfully',
      alert: alertConfig
    });
  },
  
  setTarget: (targetData: any) => {
    const target = {
      id: `TARGET_${Date.now()}`,
      ...targetData,
      currentValue: 0,
      progress: 0,
      status: 'on_track',
      createdAt: new Date().toISOString()
    };
    
    return mockResponse({
      message: 'Target set successfully',
      target
    });
  },
};

// Community API
export const communityAPI = {
  getPosts: (params?: any) => {
    const posts = getStorageData(STORAGE_KEYS.posts);
    
    return mockResponse({
      posts,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalPosts: posts.length
      }
    });
  },
  
  getPost: (id: string) => {
    const posts = getStorageData(STORAGE_KEYS.posts);
    const post = posts.find((p: any) => p._id === id);
    
    if (!post) {
      return mockError('Post not found', 404);
    }
    
    return mockResponse({ post });
  },
  
  createPost: (postData: any) => {
    const posts = getStorageData(STORAGE_KEYS.posts);
    const newPost = {
      _id: generateId(),
      ...postData,
      likes: [],
      replies: [],
      views: 0,
      createdAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    setStorageData(STORAGE_KEYS.posts, posts);
    
    return mockResponse({
      message: 'Post created successfully',
      post: newPost
    });
  },
  
  likePost: (id: string) => {
    const posts = getStorageData(STORAGE_KEYS.posts);
    const postIndex = posts.findIndex((p: any) => p._id === id);
    
    if (postIndex === -1) {
      return mockError('Post not found', 404);
    }
    
    if (!posts[postIndex].likes) {
      posts[postIndex].likes = [];
    }
    
    posts[postIndex].likes.push({
      user: 'current_user',
      date: new Date().toISOString()
    });
    
    setStorageData(STORAGE_KEYS.posts, posts);
    
    return mockResponse({
      message: 'Post liked',
      likesCount: posts[postIndex].likes.length
    });
  },
  
  addReply: (id: string, reply: any) => {
    const posts = getStorageData(STORAGE_KEYS.posts);
    const postIndex = posts.findIndex((p: any) => p._id === id);
    
    if (postIndex === -1) {
      return mockError('Post not found', 404);
    }
    
    if (!posts[postIndex].replies) {
      posts[postIndex].replies = [];
    }
    
    posts[postIndex].replies.push({
      ...reply,
      date: new Date().toISOString()
    });
    
    setStorageData(STORAGE_KEYS.posts, posts);
    
    return mockResponse({
      message: 'Reply added successfully',
      post: posts[postIndex]
    });
  },
  
  getExperts: () => {
    const users = getStorageData(STORAGE_KEYS.users);
    const experts = users.filter((user: any) => 
      user.role === 'extension_officer' || user.role === 'admin'
    );
    
    return mockResponse({ experts });
  },
};

// Admin API
export const adminAPI = {
  getDashboard: () => {
    const users = getStorageData(STORAGE_KEYS.users);
    const farms = getStorageData(STORAGE_KEYS.farms);
    const crops = getStorageData(STORAGE_KEYS.crops);
    const devices = getStorageData(STORAGE_KEYS.devices);
    const inventory = getStorageData(STORAGE_KEYS.inventory);
    const posts = getStorageData(STORAGE_KEYS.posts);
    
    const stats = {
      users: {
        total: users.length,
        farmers: users.filter((u: any) => u.role === 'farmer').length,
        extensionOfficers: users.filter((u: any) => u.role === 'extension_officer').length,
        cooperatives: users.filter((u: any) => u.role === 'cooperative').length,
        newThisMonth: users.filter((u: any) => {
          const createdDate = new Date(u.createdAt);
          const now = new Date();
          return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
        }).length
      },
      farms: {
        total: farms.length,
        totalArea: farms.reduce((sum: number, farm: any) => sum + (farm.totalArea || 0), 0),
        byProvince: farms.reduce((acc: any, farm: any) => {
          const province = farm.province || 'Unknown';
          const existing = acc.find((p: any) => p._id === province);
          if (existing) {
            existing.count++;
            existing.totalArea += farm.totalArea || 0;
          } else {
            acc.push({
              _id: province,
              count: 1,
              totalArea: farm.totalArea || 0
            });
          }
          return acc;
        }, [])
      },
      crops: {
        total: crops.length,
        byCrop: crops.reduce((acc: any, crop: any) => {
          const name = crop.name || 'Unknown';
          const existing = acc.find((c: any) => c._id === name);
          if (existing) {
            existing.count++;
            existing.totalArea += crop.area || 0;
          } else {
            acc.push({
              _id: name,
              count: 1,
              totalArea: crop.area || 0
            });
          }
          return acc;
        }, []),
        totalYield: crops.reduce((sum: number, crop: any) => sum + (crop.actualYield || 0), 0)
      },
      iot: {
        total: devices.length,
        online: devices.filter((d: any) => d.status === 'online' || d.status === 'active').length,
        byType: devices.reduce((acc: any, device: any) => {
          const type = device.type || 'Unknown';
          const existing = acc.find((t: any) => t._id === type);
          if (existing) {
            existing.count++;
          } else {
            acc.push({
              _id: type,
              count: 1
            });
          }
          return acc;
        }, [])
      },
      community: {
        totalPosts: posts.length,
        totalReplies: posts.reduce((sum: number, post: any) => sum + (post.replies?.length || 0), 0),
        activeUsers: users.filter((u: any) => u.isActive).length
      },
      inventory: {
        totalItems: inventory.length,
        totalValue: inventory.reduce((sum: number, item: any) => sum + (item.totalValue || 0), 0),
        lowStock: inventory.filter((item: any) => 
          item.status === 'low_stock' || item.status === 'critical' || item.status === 'out_of_stock'
        ).length
      }
    };
    
    return mockResponse({ stats });
  },
  
  getUsers: (params?: any) => {
    const users = getStorageData(STORAGE_KEYS.users);
    
    return mockResponse({
      users,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalUsers: users.length
      }
    });
  },
  
  updateUser: (id: string, updates: any) => {
    const users = getStorageData(STORAGE_KEYS.users);
    const userIndex = users.findIndex((u: any) => u._id === id);
    
    if (userIndex === -1) {
      return mockError('User not found', 404);
    }
    
    users[userIndex] = { ...users[userIndex], ...updates };
    setStorageData(STORAGE_KEYS.users, users);
    
    return mockResponse({
      message: 'User updated successfully',
      user: users[userIndex]
    });
  },
  
  deactivateUser: (id: string) => {
    const users = getStorageData(STORAGE_KEYS.users);
    const userIndex = users.findIndex((u: any) => u._id === id);
    
    if (userIndex === -1) {
      return mockError('User not found', 404);
    }
    
    users[userIndex].isActive = false;
    setStorageData(STORAGE_KEYS.users, users);
    
    return mockResponse({ message: 'User deactivated successfully' });
  },
  
  getAnalytics: (params?: any) => {
    const analytics = {
      userGrowth: [
        { date: '2024-12-01', count: 1200 },
        { date: '2024-12-02', count: 1205 },
        { date: '2024-12-03', count: 1210 }
      ],
      farmPerformance: [
        { province: 'Lusaka Province', avgPerformance: 85.2, totalFarms: 234 },
        { province: 'Central Province', avgPerformance: 82.1, totalFarms: 189 }
      ],
      cropDistribution: [
        { crop: 'Maize', count: 1234, totalArea: 23456 },
        { crop: 'Soybeans', count: 567, totalArea: 8901 }
      ],
      deviceStatus: [
        { status: 'online', count: 389 },
        { status: 'offline', count: 67 }
      ],
      timeframe: params?.timeframe || '30days',
      generatedAt: new Date().toISOString()
    };
    
    return mockResponse({ analytics });
  },
  
  moderatePost: (id: string, moderation: any) => {
    const posts = getStorageData(STORAGE_KEYS.posts);
    const postIndex = posts.findIndex((p: any) => p._id === id);
    
    if (postIndex === -1) {
      return mockError('Post not found', 404);
    }
    
    posts[postIndex] = {
      ...posts[postIndex],
      ...moderation,
      moderatedAt: new Date().toISOString()
    };
    
    setStorageData(STORAGE_KEYS.posts, posts);
    
    return mockResponse({
      message: 'Post moderated successfully',
      post: posts[postIndex]
    });
  },
};

export default api;
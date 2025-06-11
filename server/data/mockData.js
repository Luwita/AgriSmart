// This file contains mock data for when the database is not available

export const mockUsers = [
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
    farmProfile: { 
      farmName: 'Mwanza Family Farm',
      location: 'Chongwe', 
      province: 'Lusaka Province', 
      totalArea: 25,
      soilType: 'Sandy loam',
      waterSource: 'Borehole + Seasonal streams',
      establishedYear: 2010,
      certification: 'Organic certified'
    },
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

export const mockFarms = [
  {
    _id: '1',
    owner: '1',
    name: 'Mwanza Family Farm',
    location: 'Chongwe District',
    province: 'Lusaka Province',
    totalArea: 25,
    soilType: 'Sandy loam',
    waterSource: 'Borehole + Seasonal streams',
    establishedYear: 2010,
    certification: 'Organic certified',
    farmingType: 'Mixed farming',
    performance: {
      totalYield: 156.8,
      profitMargin: 38.2,
      sustainabilityScore: 81,
      efficiency: 85
    },
    isActive: true,
    createdAt: '2024-01-15'
  }
];

export const mockCrops = [
  {
    _id: '1',
    owner: '1',
    farm: '1',
    name: 'Maize',
    localName: 'Chimanga',
    variety: 'SC627',
    field: 'Block A',
    area: 10,
    plantingDate: '2024-11-15',
    expectedHarvest: '2025-05-15',
    growthStage: 'Tasseling',
    health: 92,
    yieldPrediction: 6.5,
    status: 'excellent',
    activities: [
      {
        type: 'Planting',
        date: '2024-11-15',
        description: 'Initial planting',
        cost: 2500,
        notes: 'Used SC627 variety'
      },
      {
        type: 'Fertilizer',
        date: '2024-12-15',
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
          applicationDate: '2024-12-15',
          cost: 3200
        }
      ],
      pesticides: [
        {
          type: 'Emamectin benzoate',
          quantity: 5,
          applicationDate: '2024-12-20',
          targetPest: 'Fall armyworm',
          cost: 850
        }
      ]
    },
    economics: {
      totalCost: 12500,
      revenue: 42250,
      profit: 29750,
      profitMargin: 70.4
    },
    isActive: true,
    createdAt: '2024-11-15'
  },
  {
    _id: '2',
    owner: '1',
    farm: '1',
    name: 'Soybeans',
    localName: 'Soya',
    variety: 'Soprano',
    field: 'Block B',
    area: 8,
    plantingDate: '2024-12-01',
    expectedHarvest: '2025-04-30',
    growthStage: 'Pod Development',
    health: 87,
    yieldPrediction: 2.2,
    status: 'good',
    activities: [
      {
        type: 'Planting',
        date: '2024-12-01',
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
    economics: {
      totalCost: 8500,
      revenue: 0,
      profit: 0,
      profitMargin: 0
    },
    isActive: true,
    createdAt: '2024-12-01'
  }
];

export const mockDevices = [
  {
    _id: '1',
    owner: '1',
    farm: '1',
    name: 'Soil Sensor A1',
    type: 'Soil Monitor',
    location: 'Block A - North Section',
    deviceId: 'ST2000-001-ZM',
    manufacturer: 'AgroTech Solutions',
    model: 'ST-2000',
    status: 'online',
    battery: 87,
    signalStrength: 85,
    readings: [
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        data: {
          moisture: 68,
          temperature: 24,
          pH: 6.8,
          nutrients: 'Good'
        }
      }
    ],
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    _id: '2',
    owner: '1',
    farm: '1',
    name: 'Weather Station B1',
    type: 'Weather Monitor',
    location: 'Block B - Central',
    deviceId: 'WP500-002-ZM',
    manufacturer: 'WeatherPro Zambia',
    model: 'WP-500',
    status: 'online',
    battery: 92,
    signalStrength: 92,
    readings: [
      {
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        data: {
          temperature: 28,
          humidity: 65,
          windSpeed: 12,
          rainfall: 2.5
        }
      }
    ],
    isActive: true,
    createdAt: '2024-02-10'
  }
];

export const mockInventory = [
  {
    _id: '1',
    owner: '1',
    farm: '1',
    name: 'D-Compound Fertilizer',
    category: 'fertilizers',
    quantity: 25,
    unit: 'bags',
    costPerUnit: 280,
    totalValue: 7000,
    supplier: 'Zambia Fertilizer Company',
    status: 'in_stock',
    isActive: true,
    createdAt: '2024-10-15'
  },
  {
    _id: '2',
    owner: '1',
    farm: '1',
    name: 'SC627 Maize Seeds',
    category: 'seeds',
    quantity: 15,
    unit: 'bags',
    costPerUnit: 250,
    totalValue: 3750,
    supplier: 'Seed Co',
    status: 'in_stock',
    isActive: true,
    createdAt: '2024-10-10'
  }
];

export const mockPosts = [
  {
    _id: '1',
    author: '1',
    title: 'Best practices for fall armyworm control?',
    content: 'I\'ve noticed some fall armyworm damage in my maize crop. What are the most effective control methods that other farmers are using this season?',
    category: 'pests',
    tags: ['maize', 'pests', 'fall armyworm'],
    likes: [],
    replies: [
      {
        author: '2',
        content: 'For fall armyworm, I recommend using Emamectin benzoate at 200g/ha. Apply early morning or late evening for best results. Also consider crop rotation next season.',
        date: new Date(Date.now() - 12 * 60 * 60 * 1000)
      }
    ],
    views: 45,
    status: 'active',
    isActive: true,
    createdAt: '2024-12-10'
  },
  {
    _id: '2',
    author: '2',
    title: 'FRA maize purchase program 2024-2025',
    content: 'The Food Reserve Agency has announced the maize purchase program for the 2024-2025 season. The price is set at ZMW 4,000 per ton. Registration starts next week at all district offices.',
    category: 'market',
    tags: ['maize', 'FRA', 'market'],
    likes: [
      {
        user: '1',
        date: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ],
    replies: [],
    views: 120,
    status: 'pinned',
    isActive: true,
    createdAt: '2024-12-08'
  }
];
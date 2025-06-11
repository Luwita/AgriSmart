import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/apiResponse.js';

// Mock market data
const zambianMarketPrices = {
  maize: {
    current: 4250,
    change: 12.5,
    trend: 'up',
    unit: 'per ton (ZMW)',
    fraPrice: 4000,
    exportPrice: 4800,
    markets: [
      { name: 'Lusaka City Market', price: 4200, demand: 'High' },
      { name: 'Soweto Market', price: 4350, demand: 'Medium' },
      { name: 'FRA', price: 4000, demand: 'Guaranteed' }
    ]
  },
  soybeans: {
    current: 6800,
    change: -3.2,
    trend: 'down',
    unit: 'per ton (ZMW)',
    fraPrice: null,
    exportPrice: 7200,
    markets: [
      { name: 'Tiger Feeds', price: 6800, demand: 'High' },
      { name: 'Zambeef', price: 7000, demand: 'Medium' }
    ]
  },
  groundnuts: {
    current: 8500,
    change: 8.7,
    trend: 'up',
    unit: 'per ton (ZMW)',
    fraPrice: null,
    exportPrice: 9200,
    markets: [
      { name: 'Olam Zambia', price: 8500, demand: 'High' },
      { name: 'Export Trading', price: 8800, demand: 'Medium' }
    ]
  }
};

const zambianBuyers = [
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
  },
  {
    name: 'Tiger Feeds',
    type: 'processor',
    location: 'Lusaka',
    cropsWanted: ['maize', 'soybeans', 'sunflower'],
    priceOffered: 4300,
    quantityNeeded: '200+ tons',
    paymentTerms: '30 days credit',
    contact: '+260 211 845 123',
    verified: true,
    rating: 4
  }
];

// @desc    Get market prices
// @route   GET /api/market/prices
// @access  Private
export const getPrices = asyncHandler(async (req, res) => {
  const { crop, province } = req.query;

  const cropData = crop ? { [crop]: zambianMarketPrices[crop] } : zambianMarketPrices;

  sendResponse(res, 200, {
    prices: cropData,
    lastUpdated: new Date(),
    province: province || 'All Provinces'
  }, 'Market prices retrieved successfully');
});

// @desc    Get buyers
// @route   GET /api/market/buyers
// @access  Private
export const getBuyers = asyncHandler(async (req, res) => {
  const { crop, location, type } = req.query;

  let filteredBuyers = zambianBuyers;

  if (crop) {
    filteredBuyers = filteredBuyers.filter(buyer =>
      buyer.cropsWanted.includes(crop)
    );
  }

  if (location) {
    filteredBuyers = filteredBuyers.filter(buyer =>
      buyer.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (type) {
    filteredBuyers = filteredBuyers.filter(buyer => buyer.type === type);
  }

  sendResponse(res, 200, { buyers: filteredBuyers }, 'Buyers retrieved successfully');
});

// @desc    Get market analysis
// @route   GET /api/market/analysis
// @access  Private
export const getAnalysis = asyncHandler(async (req, res) => {
  const { crop, timeframe } = req.query;

  const analysis = {
    crop: crop || 'maize',
    timeframe: timeframe || '30days',
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
      },
      {
        title: 'Export Opportunities',
        description: 'DRC offering 15% premium for quality white maize',
        impact: 'positive',
        recommendation: 'Contact COMESA trade office'
      }
    ],
    forecast: {
      nextMonth: 'stable_to_rising',
      confidence: 78,
      factors: ['seasonal_demand', 'export_opportunities', 'government_policy']
    }
  };

  sendResponse(res, 200, { analysis }, 'Market analysis retrieved successfully');
});

// @desc    Get market trends
// @route   GET /api/market/trends
// @access  Private
export const getTrends = asyncHandler(async (req, res) => {
  const { crop, period } = req.query;

  const trends = {
    crop: crop || 'maize',
    period: period || '6months',
    priceHistory: [
      { month: 'Jul 2024', price: 3600 },
      { month: 'Aug 2024', price: 3750 },
      { month: 'Sep 2024', price: 3900 },
      { month: 'Oct 2024', price: 4000 },
      { month: 'Nov 2024', price: 4150 },
      { month: 'Dec 2024', price: 4250 }
    ],
    demandTrend: 'increasing',
    supplyTrend: 'stable',
    seasonalFactors: {
      currentSeason: 'harvest',
      impact: 'price_pressure_downward',
      nextSeason: 'planting',
      expectedImpact: 'price_increase'
    }
  };

  sendResponse(res, 200, { trends }, 'Market trends retrieved successfully');
});
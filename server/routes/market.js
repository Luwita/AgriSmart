import express from 'express';
import Market from '../models/Market.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get market prices
router.get('/prices', auth, async (req, res) => {
  try {
    const { crop, province } = req.query;

    // Mock market data - in production, integrate with actual market APIs
    const marketPrices = {
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
      }
    };

    const cropData = crop ? marketPrices[crop] : marketPrices;

    res.json({ 
      prices: cropData,
      lastUpdated: new Date(),
      province: province || 'All Provinces'
    });
  } catch (error) {
    console.error('Get market prices error:', error);
    res.status(500).json({ message: 'Failed to get market prices', error: error.message });
  }
});

// Get buyers
router.get('/buyers', auth, async (req, res) => {
  try {
    const { crop, location, type } = req.query;

    // Mock buyers data
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

    let filteredBuyers = buyers;

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

    res.json({ buyers: filteredBuyers });
  } catch (error) {
    console.error('Get buyers error:', error);
    res.status(500).json({ message: 'Failed to get buyers', error: error.message });
  }
});

// Get market analysis
router.get('/analysis', auth, async (req, res) => {
  try {
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

    res.json({ analysis });
  } catch (error) {
    console.error('Get market analysis error:', error);
    res.status(500).json({ message: 'Failed to get market analysis', error: error.message });
  }
});

export default router;
// This service would integrate with a real market API in production
// For now, we'll use mock data

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

export const getMarketPrices = (crop) => {
  if (crop) {
    return { [crop]: zambianMarketPrices[crop] };
  }
  return zambianMarketPrices;
};

export const getBuyersList = (filters = {}) => {
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
    },
    {
      name: 'Food Reserve Agency (FRA)',
      type: 'government',
      location: 'Multiple Locations',
      cropsWanted: ['maize'],
      priceOffered: 4000,
      quantityNeeded: 'Unlimited',
      paymentTerms: 'Government guarantee',
      contact: '+260 211 123 456',
      verified: true,
      rating: 4
    }
  ];
  
  let filteredBuyers = [...buyers];
  
  if (filters.crop) {
    filteredBuyers = filteredBuyers.filter(buyer => 
      buyer.cropsWanted.includes(filters.crop)
    );
  }
  
  if (filters.location) {
    filteredBuyers = filteredBuyers.filter(buyer => 
      buyer.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  if (filters.type) {
    filteredBuyers = filteredBuyers.filter(buyer => buyer.type === filters.type);
  }
  
  return filteredBuyers;
};

export const getMarketAnalysis = (crop = 'maize') => {
  return {
    crop,
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
};
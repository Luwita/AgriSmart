// Real Zambian Agricultural Data
export const zambianCrops = [
  {
    id: 1,
    name: 'Maize (White)',
    localName: 'Chimanga',
    field: 'Chongwe Farm Block A',
    area: '15 hectares',
    plantingDate: '2024-11-15', // Zambian planting season
    expectedHarvest: '2024-05-15',
    growthStage: 'Tasseling',
    health: 92,
    yieldPrediction: '6.5 tons/ha', // Realistic Zambian yield
    status: 'excellent',
    lastActivity: 'D-Compound fertilizer applied',
    daysToHarvest: 45,
    variety: 'SC627', // Popular Zambian variety
    image: 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Soybeans',
    localName: 'Soya',
    field: 'Mkushi Farm Block B',
    area: '10 hectares',
    plantingDate: '2024-12-01',
    expectedHarvest: '2024-04-30',
    growthStage: 'Pod Development',
    health: 87,
    yieldPrediction: '2.2 tons/ha',
    status: 'good',
    lastActivity: 'Pest monitoring - Fall armyworm check',
    daysToHarvest: 62,
    variety: 'Soprano',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Groundnuts',
    localName: 'Mtedza',
    field: 'Eastern Province Block C',
    area: '8 hectares',
    plantingDate: '2024-11-20',
    expectedHarvest: '2024-04-20',
    growthStage: 'Pegging',
    health: 78,
    yieldPrediction: '1.8 tons/ha',
    status: 'fair',
    lastActivity: 'Irrigation - Treadle pump used',
    daysToHarvest: 50,
    variety: 'Chalimbana',
    image: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Sunflower',
    localName: 'Mpendadzuwa',
    field: 'Central Province Block D',
    area: '12 hectares',
    plantingDate: '2024-11-10',
    expectedHarvest: '2024-03-15',
    growthStage: 'Flowering',
    health: 95,
    yieldPrediction: '1.5 tons/ha',
    status: 'excellent',
    lastActivity: 'Growth monitoring',
    daysToHarvest: 40,
    variety: 'Pannar 7351',
    image: 'https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'Cotton',
    localName: 'Thonje',
    field: 'Southern Province Block E',
    area: '20 hectares',
    plantingDate: '2024-12-15',
    expectedHarvest: '2024-06-15',
    growthStage: 'Vegetative',
    health: 89,
    yieldPrediction: '2.8 tons/ha',
    status: 'good',
    lastActivity: 'First weeding completed',
    daysToHarvest: 85,
    variety: 'Chureza',
    image: 'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const zambianMarkets = [
  {
    market: 'Lusaka City Market',
    location: 'Lusaka',
    distance: '15 km',
    price: 4200, // ZMW per ton
    demand: 'High',
    lastUpdate: '2 hours ago',
    contact: '+260 977 123 456',
    crops: ['maize', 'soybeans', 'groundnuts']
  },
  {
    market: 'Soweto Market',
    location: 'Lusaka',
    distance: '22 km',
    price: 4350,
    demand: 'Medium',
    lastUpdate: '4 hours ago',
    contact: '+260 955 789 012',
    crops: ['maize', 'vegetables']
  },
  {
    market: 'Chongwe Depot',
    location: 'Chongwe',
    distance: '45 km',
    price: 4100,
    demand: 'High',
    lastUpdate: '1 day ago',
    contact: '+260 966 345 678',
    crops: ['maize', 'cotton']
  },
  {
    market: 'Food Reserve Agency (FRA)',
    location: 'Multiple Locations',
    distance: 'Various',
    price: 4000, // Government price
    demand: 'Guaranteed',
    lastUpdate: '6 hours ago',
    contact: '+260 211 123 456',
    crops: ['maize']
  },
  {
    market: 'Kapiri Mposhi Market',
    location: 'Central Province',
    distance: '180 km',
    price: 4280,
    demand: 'Medium',
    lastUpdate: '6 hours ago',
    contact: '+260 979 234 567',
    crops: ['maize', 'soybeans', 'sunflower']
  },
  {
    market: 'Ndola Central Market',
    location: 'Ndola',
    distance: '320 km',
    price: 4400,
    demand: 'High',
    lastUpdate: '3 hours ago',
    contact: '+260 966 111 222',
    crops: ['maize', 'soybeans']
  }
];

// Real Zambian Buyers Database
export const zambianBuyers = [
  {
    name: 'Zambeef Products PLC',
    type: 'processor',
    location: 'Lusaka',
    cropsWanted: ['maize', 'soybeans'],
    priceOffered: 4500,
    quantityNeeded: '500+ tons',
    paymentTerms: 'Cash on delivery',
    contact: '+260 211 256 354',
    email: 'procurement@zambeef.co.zm',
    verified: true,
    rating: 5,
    description: 'Leading agribusiness company in Zambia',
    requirements: 'Moisture content <12.5%, Grade 1 quality'
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
    email: 'buying@tigerfeeds.co.zm',
    verified: true,
    rating: 4,
    description: 'Animal feed manufacturer',
    requirements: 'Clean, dry grain, aflatoxin tested'
  },
  {
    name: 'Dunavant Zambia',
    type: 'processor',
    location: 'Chipata',
    cropsWanted: ['cotton'],
    priceOffered: 13500,
    quantityNeeded: '1000+ tons',
    paymentTerms: 'Cash on delivery',
    contact: '+260 216 221 456',
    email: 'cotton@dunavant.co.zm',
    verified: true,
    rating: 5,
    description: 'Cotton ginning and export company',
    requirements: 'Grade A cotton, moisture <8%'
  },
  {
    name: 'Cargill Zambia',
    type: 'processor',
    location: 'Ndola',
    cropsWanted: ['soybeans', 'sunflower'],
    priceOffered: 7200,
    quantityNeeded: '300+ tons',
    paymentTerms: 'Cash on delivery',
    contact: '+260 212 617 890',
    email: 'zambia@cargill.com',
    verified: true,
    rating: 5,
    description: 'Global agricultural commodity trader',
    requirements: 'Export quality, certified organic preferred'
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
    email: 'info@fra.org.zm',
    verified: true,
    rating: 4,
    description: 'Government strategic food reserve',
    requirements: 'Moisture <12.5%, Grade 1, FRA registered'
  },
  {
    name: 'Mukuba Commodities',
    type: 'trader',
    location: 'Kitwe',
    cropsWanted: ['maize', 'groundnuts'],
    priceOffered: 4250,
    quantityNeeded: '100+ tons',
    paymentTerms: 'Cash on delivery',
    contact: '+260 212 345 678',
    email: 'trade@mukuba.co.zm',
    verified: true,
    rating: 4,
    description: 'Regional commodity trader',
    requirements: 'Clean grain, proper storage'
  },
  {
    name: 'Olam Zambia',
    type: 'exporter',
    location: 'Lusaka',
    cropsWanted: ['groundnuts', 'sunflower'],
    priceOffered: 9200,
    quantityNeeded: '250+ tons',
    paymentTerms: 'Letter of credit',
    contact: '+260 211 789 012',
    email: 'zambia@olamgroup.com',
    verified: true,
    rating: 5,
    description: 'International agricultural commodity exporter',
    requirements: 'Export grade, phytosanitary certificates'
  },
  {
    name: 'Lusaka Cooperative Union',
    type: 'cooperative',
    location: 'Lusaka',
    cropsWanted: ['maize', 'soybeans', 'groundnuts'],
    priceOffered: 4150,
    quantityNeeded: '50+ tons',
    paymentTerms: 'Cash on delivery',
    contact: '+260 977 456 789',
    email: 'union@lusakacoop.org.zm',
    verified: true,
    rating: 4,
    description: 'Farmer cooperative marketing union',
    requirements: 'Member farmers preferred, bulk quantities'
  },
  {
    name: 'Agritech Zambia',
    type: 'trader',
    location: 'Chongwe',
    cropsWanted: ['maize', 'cotton'],
    priceOffered: 4350,
    quantityNeeded: '150+ tons',
    paymentTerms: 'Cash on delivery',
    contact: '+260 966 234 567',
    email: 'buy@agritech.co.zm',
    verified: true,
    rating: 4,
    description: 'Agricultural commodity trading company',
    requirements: 'Quality tested, proper documentation'
  },
  {
    name: 'Export Trading Group',
    type: 'exporter',
    location: 'Livingstone',
    cropsWanted: ['maize', 'soybeans'],
    priceOffered: 4800,
    quantityNeeded: '400+ tons',
    paymentTerms: 'Bank guarantee',
    contact: '+260 213 567 890',
    email: 'export@etg.co.zm',
    verified: true,
    rating: 5,
    description: 'Regional export specialist',
    requirements: 'Export quality, COMESA certificates'
  },
  {
    name: 'Mpongwe Farmers Cooperative',
    type: 'cooperative',
    location: 'Mpongwe',
    cropsWanted: ['groundnuts', 'sunflower'],
    priceOffered: 8800,
    quantityNeeded: '80+ tons',
    paymentTerms: 'Cash on delivery',
    contact: '+260 979 123 456',
    email: 'coop@mpongwe.org.zm',
    verified: true,
    rating: 4,
    description: 'Local farmer cooperative',
    requirements: 'Local farmers, quality produce'
  },
  {
    name: 'Grain Traders Zambia',
    type: 'trader',
    location: 'Kabwe',
    cropsWanted: ['maize', 'soybeans'],
    priceOffered: 4200,
    quantityNeeded: '120+ tons',
    paymentTerms: 'Cash on delivery',
    contact: '+260 955 678 901',
    email: 'grain@traders.co.zm',
    verified: true,
    rating: 3,
    description: 'Grain trading and storage',
    requirements: 'Bulk quantities, proper grading'
  }
];

// Regional Export Markets
export const zambianExportMarkets = [
  {
    country: 'Democratic Republic of Congo',
    flag: '🇨🇩',
    premium: '+15% above local',
    volume: '50,000+ tons annually',
    requirements: 'COMESA certificate',
    crops: ['maize', 'soybeans'],
    contact: '+243 123 456 789'
  },
  {
    country: 'Tanzania',
    flag: '🇹🇿',
    premium: '+12% above local',
    volume: '30,000+ tons annually',
    requirements: 'Phytosanitary certificate',
    crops: ['groundnuts', 'sunflower'],
    contact: '+255 123 456 789'
  },
  {
    country: 'Malawi',
    flag: '🇲🇼',
    premium: '+8% above local',
    volume: '20,000+ tons annually',
    requirements: 'Quality certificate',
    crops: ['maize', 'cotton'],
    contact: '+265 123 456 789'
  }
];

export const zambianWeatherStations = [
  {
    location: 'Lusaka',
    province: 'Lusaka Province',
    coordinates: { lat: -15.4067, lng: 28.2871 },
    currentTemp: 28,
    humidity: 65,
    rainfall: 2.5,
    windSpeed: 12,
    elevation: 1279 // meters above sea level
  },
  {
    location: 'Ndola',
    province: 'Copperbelt Province',
    coordinates: { lat: -12.9587, lng: 28.6366 },
    currentTemp: 25,
    humidity: 75,
    rainfall: 8.1,
    windSpeed: 8,
    elevation: 1312
  },
  {
    location: 'Kitwe',
    province: 'Copperbelt Province',
    coordinates: { lat: -12.8024, lng: 28.2132 },
    currentTemp: 24,
    humidity: 78,
    rainfall: 12.5,
    windSpeed: 6,
    elevation: 1200
  },
  {
    location: 'Chipata',
    province: 'Eastern Province',
    coordinates: { lat: -13.6333, lng: 32.6500 },
    currentTemp: 26,
    humidity: 78,
    rainfall: 12.5,
    windSpeed: 10,
    elevation: 1147
  },
  {
    location: 'Livingstone',
    province: 'Southern Province',
    coordinates: { lat: -17.8419, lng: 25.8561 },
    currentTemp: 31,
    humidity: 55,
    rainfall: 0.5,
    windSpeed: 18,
    elevation: 986
  },
  {
    location: 'Mongu',
    province: 'Western Province',
    coordinates: { lat: -15.2500, lng: 23.1167 },
    currentTemp: 33,
    humidity: 45,
    rainfall: 0.0,
    windSpeed: 20,
    elevation: 1052
  },
  {
    location: 'Kasama',
    province: 'Northern Province',
    coordinates: { lat: -10.2167, lng: 31.1833 },
    currentTemp: 24,
    humidity: 85,
    rainfall: 25.8,
    windSpeed: 6,
    elevation: 1390
  },
  {
    location: 'Mansa',
    province: 'Luapula Province',
    coordinates: { lat: -11.1833, lng: 28.8833 },
    currentTemp: 23,
    humidity: 88,
    rainfall: 32.1,
    windSpeed: 5,
    elevation: 1218
  },
  {
    location: 'Chinsali',
    province: 'Muchinga Province',
    coordinates: { lat: -10.5333, lng: 32.0833 },
    currentTemp: 22,
    humidity: 82,
    rainfall: 18.6,
    windSpeed: 7,
    elevation: 1340
  },
  {
    location: 'Solwezi',
    province: 'North-Western Province',
    coordinates: { lat: -12.1833, lng: 26.9000 },
    currentTemp: 27,
    humidity: 70,
    rainfall: 15.3,
    windSpeed: 9,
    elevation: 1235
  }
];

export const zambianCropPrices = {
  maize: {
    current: 4250, // ZMW per ton
    change: 12.5,
    trend: 'up',
    unit: 'per ton (ZMW)',
    forecast: 'rising',
    demand: 'high',
    fraPrice: 4000, // Government guaranteed price
    exportPrice: 4800 // Regional export price
  },
  soybeans: {
    current: 6800,
    change: -3.2,
    trend: 'down',
    unit: 'per ton (ZMW)',
    forecast: 'stable',
    demand: 'medium',
    fraPrice: null,
    exportPrice: 7200
  },
  groundnuts: {
    current: 8500,
    change: 8.7,
    trend: 'up',
    unit: 'per ton (ZMW)',
    forecast: 'rising',
    demand: 'high',
    fraPrice: null,
    exportPrice: 9200
  },
  sunflower: {
    current: 7200,
    change: 5.1,
    trend: 'up',
    unit: 'per ton (ZMW)',
    forecast: 'rising',
    demand: 'medium',
    fraPrice: null,
    exportPrice: 7800
  },
  cotton: {
    current: 12500,
    change: 15.2,
    trend: 'up',
    unit: 'per ton (ZMW)',
    forecast: 'rising',
    demand: 'high',
    fraPrice: null,
    exportPrice: 14000
  }
};

export const zambianSeasons = {
  rainySeasonStart: 'November',
  rainySeasonEnd: 'April',
  drySeasonStart: 'May',
  drySeasonEnd: 'October',
  plantingWindow: 'November - December',
  harvestWindow: 'April - July',
  currentSeason: 'Rainy Season (Peak Growing Period)',
  seasonalActivities: {
    'November': 'Land preparation, first planting',
    'December': 'Main planting season, early weeding',
    'January': 'Peak rains, fertilizer application',
    'February': 'Pest monitoring, second weeding',
    'March': 'Late rains, crop maturation',
    'April': 'Harvest preparation, early harvest',
    'May': 'Main harvest season',
    'June': 'Harvest completion, storage',
    'July': 'Post-harvest activities',
    'August': 'Land preparation for winter crops',
    'September': 'Equipment maintenance',
    'October': 'Pre-season preparations'
  }
};

export const zambianProvinces = [
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
];

export const zambianAgriculturalZones = {
  'Zone I': {
    provinces: ['Western Province', 'Parts of Southern Province'],
    rainfall: '600-800mm',
    suitableCrops: ['Maize', 'Sorghum', 'Millet', 'Groundnuts'],
    characteristics: 'Low rainfall, drought-prone, requires drought-resistant varieties'
  },
  'Zone IIa': {
    provinces: ['Southern Province', 'Parts of Central Province'],
    rainfall: '800-1000mm',
    suitableCrops: ['Maize', 'Cotton', 'Sunflower', 'Soybeans'],
    characteristics: 'Medium rainfall, good for cash crops, reliable growing season'
  },
  'Zone IIb': {
    provinces: ['Eastern Province', 'Parts of Central Province'],
    rainfall: '1000-1200mm',
    suitableCrops: ['Maize', 'Tobacco', 'Soybeans', 'Groundnuts'],
    characteristics: 'Good rainfall, suitable for most crops, extended growing season'
  },
  'Zone III': {
    provinces: ['Northern Province', 'Luapula Province', 'Muchinga Province'],
    rainfall: '1200mm+',
    suitableCrops: ['Cassava', 'Rice', 'Beans', 'Maize'],
    characteristics: 'High rainfall, suitable for root crops, potential for flooding'
  }
};

export const zambianFertilizers = [
  {
    name: 'D-Compound',
    composition: '10-20-10',
    usage: 'Basal application',
    pricePerBag: 280, // ZMW for 50kg
    supplier: 'Zambia Fertilizer Company'
  },
  {
    name: 'Urea',
    composition: '46-0-0',
    usage: 'Top dressing',
    pricePerBag: 320,
    supplier: 'Nitrogen Chemicals of Zambia'
  },
  {
    name: 'CAN (Calcium Ammonium Nitrate)',
    composition: '26-0-0',
    usage: 'Top dressing',
    pricePerBag: 290,
    supplier: 'Various suppliers'
  }
];

export const zambianPests = [
  {
    name: 'Fall Armyworm',
    localName: 'Chimbwi',
    affectedCrops: ['Maize', 'Sorghum'],
    season: 'Rainy season',
    treatment: 'Emamectin benzoate, Chlorantraniliprole',
    prevention: 'Early planting, crop rotation'
  },
  {
    name: 'Maize Stalk Borer',
    localName: 'Chimbwi cha chimanga',
    affectedCrops: ['Maize'],
    season: 'Throughout growing season',
    treatment: 'Bt maize varieties, chemical control',
    prevention: 'Clean cultivation, resistant varieties'
  },
  {
    name: 'Aphids',
    localName: 'Tuzilombo',
    affectedCrops: ['Soybeans', 'Groundnuts'],
    season: 'Dry season',
    treatment: 'Systemic insecticides',
    prevention: 'Beneficial insects, early detection'
  }
];

// Real Zambian Weather Data by Province
export const zambianWeatherData = {
  'Lusaka Province': {
    averageRainfall: {
      'November': 120,
      'December': 180,
      'January': 220,
      'February': 200,
      'March': 150,
      'April': 80
    },
    averageTemperature: {
      'November': 28,
      'December': 29,
      'January': 27,
      'February': 28,
      'March': 29,
      'April': 27
    },
    climaticConditions: 'Subtropical highland climate with distinct wet and dry seasons'
  },
  'Copperbelt Province': {
    averageRainfall: {
      'November': 140,
      'December': 200,
      'January': 250,
      'February': 220,
      'March': 180,
      'April': 100
    },
    averageTemperature: {
      'November': 26,
      'December': 27,
      'January': 25,
      'February': 26,
      'March': 27,
      'April': 25
    },
    climaticConditions: 'Tropical savanna climate with higher rainfall than southern regions'
  },
  'Northern Province': {
    averageRainfall: {
      'November': 180,
      'December': 250,
      'January': 300,
      'February': 280,
      'March': 220,
      'April': 140
    },
    averageTemperature: {
      'November': 24,
      'December': 25,
      'January': 23,
      'February': 24,
      'March': 25,
      'April': 23
    },
    climaticConditions: 'Tropical climate with high rainfall and humidity'
  },
  'Western Province': {
    averageRainfall: {
      'November': 80,
      'December': 120,
      'January': 160,
      'February': 140,
      'March': 100,
      'April': 50
    },
    averageTemperature: {
      'November': 32,
      'December': 33,
      'January': 31,
      'February': 32,
      'March': 33,
      'April': 31
    },
    climaticConditions: 'Semi-arid climate with low rainfall and high temperatures'
  }
};
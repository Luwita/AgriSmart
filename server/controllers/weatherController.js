import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/apiResponse.js';

// Mock weather data for Zambian provinces
const zambianWeatherData = {
  'Lusaka Province': {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    condition: 'Partly Cloudy',
    rainfall: 2.5
  },
  'Copperbelt Province': {
    temperature: 25,
    humidity: 75,
    windSpeed: 8,
    pressure: 1015,
    visibility: 8,
    uvIndex: 5,
    condition: 'Cloudy',
    rainfall: 8.1
  },
  'Central Province': {
    temperature: 29,
    humidity: 60,
    windSpeed: 15,
    pressure: 1011,
    visibility: 12,
    uvIndex: 7,
    condition: 'Sunny',
    rainfall: 1.2
  }
};

// @desc    Get weather data for location
// @route   GET /api/weather
// @access  Private
export const getCurrentWeather = asyncHandler(async (req, res) => {
  const { province, coordinates } = req.query;
  
  const selectedProvince = province || 'Lusaka Province';
  const currentWeather = zambianWeatherData[selectedProvince] || zambianWeatherData['Lusaka Province'];

  const weatherData = {
    current: currentWeather,
    forecast: [
      { day: 'Today', high: currentWeather.temperature + 2, low: currentWeather.temperature - 8, condition: currentWeather.condition, rain: 25 },
      { day: 'Tomorrow', high: currentWeather.temperature + 1, low: currentWeather.temperature - 7, condition: 'Partly Cloudy', rain: 40 },
      { day: 'Friday', high: currentWeather.temperature - 2, low: currentWeather.temperature - 10, condition: 'Rainy', rain: 80 },
      { day: 'Saturday', high: currentWeather.temperature, low: currentWeather.temperature - 8, condition: 'Cloudy', rain: 40 },
      { day: 'Sunday', high: currentWeather.temperature + 3, low: currentWeather.temperature - 6, condition: 'Sunny', rain: 5 },
      { day: 'Monday', high: currentWeather.temperature + 4, low: currentWeather.temperature - 5, condition: 'Hot', rain: 0 },
      { day: 'Tuesday', high: currentWeather.temperature - 1, low: currentWeather.temperature - 9, condition: 'Rainy', rain: 75 }
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Heavy Rains Expected',
        message: 'Expect 40-80mm of rainfall. Risk of flooding in low-lying areas.',
        severity: 'high',
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    ],
    province: selectedProvince,
    lastUpdated: new Date()
  };

  sendResponse(res, 200, { weather: weatherData }, 'Weather data retrieved successfully');
});

// @desc    Get historical weather data
// @route   GET /api/weather/historical
// @access  Private
export const getHistoricalWeather = asyncHandler(async (req, res) => {
  const { province, startDate, endDate } = req.query;

  const historicalData = {
    province: province || 'Lusaka Province',
    period: { startDate, endDate },
    data: [
      { date: '2024-12-01', temperature: 27, rainfall: 5.2, humidity: 68 },
      { date: '2024-12-02', temperature: 29, rainfall: 0.0, humidity: 62 },
      { date: '2024-12-03', temperature: 31, rainfall: 0.0, humidity: 58 },
      { date: '2024-12-04', temperature: 28, rainfall: 12.5, humidity: 75 },
      { date: '2024-12-05', temperature: 26, rainfall: 8.1, humidity: 78 }
    ]
  };

  sendResponse(res, 200, { historical: historicalData }, 'Historical weather data retrieved');
});

// @desc    Get weather alerts
// @route   GET /api/weather/alerts
// @access  Private
export const getWeatherAlerts = asyncHandler(async (req, res) => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rains Expected - Northern Provinces',
      message: 'Expect 40-80mm of rainfall in Northern, Luapula, and Muchinga provinces.',
      severity: 'high',
      provinces: ['Northern Province', 'Luapula Province', 'Muchinga Province'],
      validUntil: new Date(Date.now() + 48 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      type: 'info',
      title: 'Optimal Spraying Conditions',
      message: 'Low wind conditions expected. Ideal for pesticide application.',
      severity: 'low',
      provinces: ['Central Province', 'Eastern Province'],
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ];

  sendResponse(res, 200, { alerts }, 'Weather alerts retrieved');
});
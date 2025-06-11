import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get weather data for location
router.get('/', auth, async (req, res) => {
  try {
    const { province, coordinates } = req.query;

    // Mock weather data - in production, integrate with actual weather API
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
        { day: 'Friday', high: 26, low: 17, condition: 'Rainy', rain: 80 },
        { day: 'Saturday', high: 28, low: 20, condition: 'Cloudy', rain: 40 },
        { day: 'Sunday', high: 31, low: 22, condition: 'Sunny', rain: 5 },
        { day: 'Monday', high: 32, low: 23, condition: 'Hot', rain: 0 },
        { day: 'Tuesday', high: 27, low: 19, condition: 'Rainy', rain: 75 }
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
      province: province || 'Lusaka Province',
      lastUpdated: new Date()
    };

    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Get weather error:', error);
    res.status(500).json({ message: 'Failed to get weather data', error: error.message });
  }
});

// Get historical weather data
router.get('/historical', auth, async (req, res) => {
  try {
    const { province, startDate, endDate } = req.query;

    // Mock historical data
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

    res.json({ historical: historicalData });
  } catch (error) {
    console.error('Get historical weather error:', error);
    res.status(500).json({ message: 'Failed to get historical weather data', error: error.message });
  }
});

export default router;
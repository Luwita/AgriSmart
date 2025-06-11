import express from 'express';
import {
  getCurrentWeather,
  getHistoricalWeather,
  getWeatherAlerts
} from '../controllers/weatherController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getCurrentWeather);
router.get('/historical', auth, getHistoricalWeather);
router.get('/alerts', auth, getWeatherAlerts);

export default router;
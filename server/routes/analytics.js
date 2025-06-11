import express from 'express';
import {
  getDashboard,
  getCropAnalytics,
  getFinancialAnalytics,
  generateReport,
  configureAlert,
  setTarget
} from '../controllers/analyticsController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', auth, getDashboard);
router.get('/crops', auth, getCropAnalytics);
router.get('/financial', auth, getFinancialAnalytics);
router.post('/reports', auth, generateReport);
router.post('/alerts', auth, configureAlert);
router.post('/targets', auth, setTarget);

export default router;
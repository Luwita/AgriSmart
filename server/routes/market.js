import express from 'express';
import {
  getPrices,
  getBuyers,
  getAnalysis,
  getTrends
} from '../controllers/marketController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/prices', auth, getPrices);
router.get('/buyers', auth, getBuyers);
router.get('/analysis', auth, getAnalysis);
router.get('/trends', auth, getTrends);

export default router;
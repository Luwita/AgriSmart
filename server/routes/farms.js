import express from 'express';
import {
  getFarms,
  getFarm,
  createFarm,
  updateFarm,
  deleteFarm,
  getFarmStats
} from '../controllers/farmController.js';
import { auth } from '../middleware/auth.js';
import { validateFarm, validateRequest } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(auth, getFarms)
  .post(auth, validateFarm, validateRequest, createFarm);

router.route('/:id')
  .get(auth, getFarm)
  .put(auth, updateFarm)
  .delete(auth, deleteFarm);

router.get('/:id/stats', auth, getFarmStats);

export default router;
import express from 'express';
import {
  getCrops,
  getCrop,
  createCrop,
  updateCrop,
  addActivity,
  deleteCrop,
  getCropAnalytics
} from '../controllers/cropController.js';
import { auth } from '../middleware/auth.js';
import { validateCrop, validateRequest } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(auth, getCrops)
  .post(auth, validateCrop, validateRequest, createCrop);

router.route('/:id')
  .get(auth, getCrop)
  .put(auth, updateCrop)
  .delete(auth, deleteCrop);

router.post('/:id/activities', auth, addActivity);
router.get('/:id/analytics', auth, getCropAnalytics);

export default router;
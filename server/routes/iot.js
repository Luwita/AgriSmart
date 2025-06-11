import express from 'express';
import {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  addReading,
  getReadings,
  addAlert,
  deleteDevice
} from '../controllers/iotController.js';
import { auth } from '../middleware/auth.js';
import { validateDevice, validateRequest } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(auth, getDevices)
  .post(auth, validateDevice, validateRequest, createDevice);

router.route('/:id')
  .get(auth, getDevice)
  .put(auth, updateDevice)
  .delete(auth, deleteDevice);

router.post('/:id/readings', auth, addReading);
router.get('/:id/readings', auth, getReadings);
router.post('/:id/alerts', auth, addAlert);

export default router;
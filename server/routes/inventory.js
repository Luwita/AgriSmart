import express from 'express';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  addTransaction,
  getLowStockAlerts,
  deleteItem
} from '../controllers/inventoryController.js';
import { auth } from '../middleware/auth.js';
import { validateInventory, validateRequest } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(auth, getItems)
  .post(auth, validateInventory, validateRequest, createItem);

router.route('/:id')
  .get(auth, getItem)
  .put(auth, updateItem)
  .delete(auth, deleteItem);

router.post('/:id/transactions', auth, addTransaction);
router.get('/alerts/low-stock', auth, getLowStockAlerts);

export default router;
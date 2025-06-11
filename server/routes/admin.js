import express from 'express';
import {
  getDashboard,
  getUsers,
  updateUser,
  deactivateUser,
  getAnalytics,
  moderatePost,
  getSystemHealth
} from '../controllers/adminController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', auth, adminAuth, getDashboard);
router.get('/users', auth, adminAuth, getUsers);
router.put('/users/:id', auth, adminAuth, updateUser);
router.delete('/users/:id', auth, adminAuth, deactivateUser);
router.get('/analytics', auth, adminAuth, getAnalytics);
router.put('/community/posts/:id/moderate', auth, adminAuth, moderatePost);
router.get('/health', auth, adminAuth, getSystemHealth);

export default router;
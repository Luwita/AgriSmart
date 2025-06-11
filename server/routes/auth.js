import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  logout
} from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import { validateRegistration, validateLogin, validateRequest } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateRegistration, validateRequest, register);
router.post('/login', validateLogin, validateRequest, login);
router.get('/me', auth, getMe);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/logout', auth, logout);

export default router;
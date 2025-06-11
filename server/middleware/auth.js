import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../config/jwt.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    
    // Get user info for role-based access
    const user = await User.findById(decoded.userId).select('-password');
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid token or user not found.' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};

export const extensionOfficerAuth = (req, res, next) => {
  if (!['admin', 'extension_officer'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Extension officer privileges required.' });
  }
  next();
};

export const farmerAuth = (req, res, next) => {
  if (!['admin', 'extension_officer', 'farmer'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Farmer privileges required.' });
  }
  next();
};
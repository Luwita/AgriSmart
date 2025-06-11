import { body, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

export const validateRegistration = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('role').isIn(['farmer', 'extension_officer', 'cooperative']).withMessage('Invalid role'),
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validateFarm = [
  body('name').trim().isLength({ min: 2 }).withMessage('Farm name must be at least 2 characters'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('province').notEmpty().withMessage('Province is required'),
  body('totalArea').isNumeric().withMessage('Total area must be a number'),
];

export const validateCrop = [
  body('name').trim().notEmpty().withMessage('Crop name is required'),
  body('area').isNumeric().withMessage('Area must be a number'),
  body('plantingDate').isISO8601().withMessage('Valid planting date is required'),
];

export const validateDevice = [
  body('name').trim().notEmpty().withMessage('Device name is required'),
  body('type').notEmpty().withMessage('Device type is required'),
  body('deviceId').trim().notEmpty().withMessage('Device ID is required'),
];

export const validateInventory = [
  body('name').trim().notEmpty().withMessage('Item name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('unit').trim().notEmpty().withMessage('Unit is required'),
];
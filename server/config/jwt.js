import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'agrismart_secret_key_2024';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export { JWT_SECRET };
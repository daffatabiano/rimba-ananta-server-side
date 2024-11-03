import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const verifyAccess = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'Token expired',
        });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'Invalid token',
        });
      }
    }
  } else {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
};

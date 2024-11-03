import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
        requestId: uuidv4(),
        data: null,
      });
    } else {
      const newUser = await User.create(req.body);

      res.status(201).json({
        success: true,
        message: null,
        requestId: uuidv4(),
        data: newUser,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'User not found',
        requestId: uuidv4(),
      });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Invalid password',
        requestId: uuidv4(),
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    res.status(200).json({
      requestId: uuidv4(),
      success: true,
      message: null,
      data: {
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expires: Date.now() + 3600000,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

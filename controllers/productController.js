import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';

export const createProduct = async (req, res) => {
  try {
    const user = req.user;
    const existingProduct = await Product.findOne({
      name: req.body.name,
      creator: user._id,
    });

    if (existingProduct) {
      return res.status(409).json({
        requestId: uuidv4(),
        success: false,
        message: 'Product Already Exists',
        data: null,
      });
    } else if (!user) {
      return res.status(404).json({
        requestId: uuidv4(),
        success: false,
        message: 'User Not Found',
        data: null,
      });
    }

    const newProduct = await Product.create({
      creator: user._id,
      productCode: uuidv4(),
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    return res.status(201).json({
      requestId: uuidv4(),
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await Product.find({ creator: userId });
    if (!products.length) {
      return res.status(404).json({
        requestId: uuidv4(),
        success: false,
        message: 'Products Not Found',
        data: null,
      });
    }
    res.status(200).json({
      requestId: uuidv4(),
      success: true,
      message: null,
      productCode: uuidv4(),
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

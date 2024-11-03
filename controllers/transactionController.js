import Transaction from '../models/transactionModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

export const createTransaction = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    const products = req.body.products;

    if (!products) {
      return res.status(404).json({
        success: false,
        message: 'Products Not Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    const transaction = await Transaction.create({
      customer: req.body.customer,
      userId: user?._id,
      invoiceNo: req.body.invoiceNo,
      products: req.body.products,
      date: req.body.date,
    });

    res.status(201).json({
      success: true,
      message: null,
      requestId: uuidv4(),
      data: transaction,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      requestId: uuidv4(),
      data: null,
    });
  }
};

export const getTransactionByUserId = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    const transactions = await Transaction.find({ userId: user?._id });
    res.status(200).json({
      success: true,
      message: null,
      requestId: uuidv4(),
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return res.status(404).json({
        success: false,
        message: 'Transaction Not Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    const transaction = await Transaction.findByIdAndDelete(transactionId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction Not Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transaction Deleted',
      requestId: uuidv4(),
      data: transaction,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);

    const transactions = await Transaction.find({ userId: userId });

    res.status(200).json({
      success: true,
      message: null,
      requestId: uuidv4(),
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

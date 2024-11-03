import mongoose from 'mongoose';

const transactionModel = mongoose.Schema({
  customer: String,
  userId: String,
  invoiceNo: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      productCode: String,
      quantity: Number,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Transaction', transactionModel);

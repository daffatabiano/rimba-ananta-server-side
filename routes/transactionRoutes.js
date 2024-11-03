import express from 'express';
import {
  createTransaction,
  deleteTransaction,
  getSummary,
  getTransactionByUserId,
} from '../controllers/transactionController.js';
import { verifyAccess } from '../middlewares/verifyAccess.js';

const routes = express.Router();

routes.post('/api/v1/transactions', verifyAccess, createTransaction);
routes.get('/api/v1/transactions', verifyAccess, getTransactionByUserId);
routes.delete('/api/v1/transactions/:id', verifyAccess, deleteTransaction);
routes.get('/api/v1/transactions/summary', verifyAccess, getSummary);

export default routes;

import express from 'express';
import {
  createProduct,
  getProductByUserId,
} from '../controllers/productController.js';
import { verifyAccess } from '../middlewares/verifyAccess.js';

const routes = express.Router();

routes.post('/api/v1/products', verifyAccess, createProduct);
routes.get('/api/v1/products', verifyAccess, getProductByUserId);

export default routes;

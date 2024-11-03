import express from 'express';
import { createUser, login } from '../controllers/userController.js';

const routes = express.Router();

routes.post('/api/v1/register', createUser);
routes.post('/api/v1/login', login);

export default routes;

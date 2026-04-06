import express from 'express';
import errMiddleware from '../middlewares/err.middleware.js';
import {  expressValidators } from '../validations/auth.validation.js';
import { authController } from '../controllers/auth.controller.js';

const authRouter = express.Router();
authRouter.post('/register', expressValidators, authController)

export default authRouter;
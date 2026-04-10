import express from 'express';
import authController from '../controllers/auth.controller.js';
import { registerValidator } from '../validation/auth.validator.js';

const authRouter = express.Router();


authRouter.post('/register', registerValidator, authController)
export default authRouter;
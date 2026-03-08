const express = require('express');
const userModel = require('../models/user.model');
const authRouter = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { registerController, loginController } = require('../controllers/auth.controller');
authRouter.post('/register', registerController);
authRouter.post('/login', loginController);

module.exports = authRouter;
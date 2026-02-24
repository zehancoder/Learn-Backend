const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
authRouter.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(409).json({ message: 'user already exist with this email' });
    }
    const hash = crypto.createHash('md5').update(password).digest('hex');
    const newUser = await userModel.create({ email, password: hash, name });
    const token = jwt.sign({ id: newUser._id, email }, process.env.jwt_secrets);
    res.cookie('jwt_token', token)
    res.status(201).json({
        message: "user create succcess",
        newUser,
        token
    });
});
authRouter.post('/login',async (req, res) => {
    const { email, password } = req.body;
    const user =await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "user not found with this email"
        });
    }
    
    const isPasswordMatch = user.password ===  crypto.createHash('md5').update(password).digest('hex');
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "invalid password"
        });
    }
    res.status(200).json({
        message: 'login success',
        user
    })
})

module.exports = authRouter
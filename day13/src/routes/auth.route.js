const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { log } = require('console');
authRouter.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(409).json({ message: "user already exist with this email" })
    }
    const newUser = await userModel.create({ name, email, password: crypto.createHash('md5').update(password).digest('hex') });
    const token = jwt.sign({ id: newUser._id }, process.env.jwt_secrets, {expiresIn: '1h'});
    res.cookie('token', token)
    res.status(201).json({
        message: 'new user create success',
        newUser,
        token
    })
});
authRouter.get('/get-me', async (req, res) => {
    const token = req.cookies.token
    const debugToken = jwt.verify(token, process.env.jwt_secrets);
    const user = await userModel.findById(debugToken.id)
    res.status(200).json({
        message: user.name + " make a send  request",
        user
    })
    
})
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "user not exist with this email"
        });
    }
    const hashPassword = crypto.createHash('md5').update(password).digest('hex') === user.password
    if (!hashPassword) {
        return res.status(409).json({
            message: "invalid password",
        })
    }
    const token = jwt.sign({ id: user._id, email }, process.env.jwt_secrets);
    res.cookie('token', token);
    res.status(200).json({
        message: "successfuly login",
        user
    })

})
module.exports = authRouter
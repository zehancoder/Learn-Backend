const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
async function registerController(req, res) {
    const { email, password, username, bio } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });
    if (isUserExist) {
        return res.status(409).json({
            message: isUserExist.email === email ? "user already exist with this email address" : "user already exist with this username"
        });
    }
    const hashPassword =await bcrypt.hash(password, 10)
    const newUser = await userModel.create({
        email,
        hashPassword: hashPassword,
        username,
        bio,
        password: hashPassword
    });
    const token = jwt.sign({
        id: newUser._id
    }, process.env.jwt_secrets);
    res.cookie('token', token)
    res.status(201).json({
        message: "user create sucessw",
        newUser,
        token,
    })

}
async function loginController(req, res) {
    const { username, email, password } = req.body;
    const isUserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    if (!isUserExist) {
        res.status(404).json({
            message: "user not exist with username or email"
        });
    }
    const isPassMatch = await bcrypt.compare(password, isUserExist.password)
    if (!isPassMatch) {
        return res.status(404).json({
            message: "invalid password try again"
        });
    }
    const token = jwt.sign({
        id: isUserExist._id
    }, process.env.jwt_secrets);
    res.cookie('token', token)
    res.status(200).json({
        message: "login success",
        isUserExist,
        token
    })
}
module.exports = { registerController, loginController }
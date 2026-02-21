const express = require("express");
const authRouter = express.Router();
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
authRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "user already exist with this email address",
    });
  }

  const newUser = await userModel.create({
    email,
    password,
    name,
  });
  const token = jwt.sign({ id: newUser._id, email }, process.env.jwt_secrets);
  res.cookie('jwt-token', token)
  res.status(201).json({
    message: "user create success",
    newUser,
    token
  });
});
module.exports = authRouter;

import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validation/auth.validator.js";
import {
  registerController,
  loginContoller,
  verifyEmail,
  getMeController,
} from "../controllers/auth.controller.js";
import { userIdentify } from "../middlewares/userIdentify.middleware.js";

const authRouter = express.Router();

// register router
authRouter.post("/register", registerValidator, registerController);
//login router
authRouter.post("/login", loginValidator, loginContoller);
// email verification router
authRouter.get("/register/verify-email", verifyEmail);
// get-me router
authRouter.get('/get-me', userIdentify, getMeController);

export default authRouter;

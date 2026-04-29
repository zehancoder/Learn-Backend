import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
export const userIdentify = async (req, res, next) => {
  const token = req.cookies.token;
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decode.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      success: false,
      err: "This token isn't verified",
    });
  }
};

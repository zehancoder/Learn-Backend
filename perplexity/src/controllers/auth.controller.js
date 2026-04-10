import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

const authController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User with this email or username already exist",
        success: false,
        err: "User already exist",
      });
    }

    const newUser = await userModel.create({ username, email, password });

    // ✅ email send আলাদাভাবে handle করো যাতে failure তে user creation block না হয়
    sendEmail({
      to: email,
      subject: "Welcome to Perplexity",
      html: `
        <p>Hi <strong>${username}</strong>,</p>
        <p>Thank you for registering at <strong>Perplexity</strong>.</p>
        <p>We're excited to have you on board!</p>
        <p>Best regards,<br/>The Perplexity Team</p>
      `,
      text: `Hi ${username}, Thank you for registering at Perplexity!`,
    }).catch((err) => console.log("⚠️ Email send failed:", err.message)); // email fail করলেও registration সফল হবে

    res.status(201).json({
      message: "New user created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log("❌ Auth error:", error.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      err: error.message,
    });
  }
};

export default authController;
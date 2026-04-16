import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

// register controller
export const registerController = async (req, res) => {
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

    const emailVerificationToken = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET,
    );

    // ✅ email send আলাদাভাবে handle করো যাতে failure তে user creation block না হয়
    sendEmail({
      to: email,
      subject: "Welcome to Perplexity",
      html: `
        <p>Hi <strong>${username}</strong>,</p>
        <p>Thank you for registering at <strong>Perplexity</strong>.</p>
        <p>please verify you email address by clicking the link below</p>
        <a href='http://localhost:3000/register/verify-email?token=${emailVerificationToken}'>Verify Email</a>
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

// login controller
export async function loginContoller(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(400).json({
      message: "Invalid Credetial",
      success: false,
      err: "User not found",
    });
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid Credetial",
      success: false,
      err: "Incorrect password",
    });
  }
  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify you email address before login",
      success: false,
      err: "Email not verified",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token);

  res.status(200).json({
    message: "Successfully login",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
}

/// email verification
export async function verifyEmail(req, res) {
  const { token } = req.query;
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({ email: decode.email });
  if (!user)
    return res.status({
      message: "Invalid token",
      success: false,
      err: "user not found",
    });
  user.verified = true;
  await user.save();
  const html = `
      <h1>Email verified successfuly</h1>
      <a href='http://localhost:3000/login'>Go To Login Now</a>
      <p>Your email has been verified successfuly, You can log now into you account</p>
    `;
  res.send(html);
}

// get-me controller
export async function getMeController(req, res){
  const user = req.user;
  console.log(user)
  if(!user){
    return res.status(409).json({
      message: "Please login/register for continue this website",
      success: false,
      err: "Token no found/verified please register/login"
    })
  }
  res.status(200).json({
    message: "User successfuly fetch",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified
    }
  })
}
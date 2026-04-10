import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userShema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userShema);
export default userModel;

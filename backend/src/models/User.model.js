import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,

  email: { type: String, unique: true },
  password: String,

  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },

  isApproved: {
    type: Boolean,
    default: false        // employee approved by admin only
  },

  otp: String,
  otpExpiry: Date

}, { timestamps: true });

export default mongoose.model("users", userSchema);

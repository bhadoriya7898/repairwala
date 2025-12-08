import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: { 
    type: String, 
    unique: true,
    required: true
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[6-9]\d{9}$/, 
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },

  isApproved: {
    type: Boolean,
    default: false // employee must be approved by admin
  },

  otp: String,
  otpExpiry: Date

}, { timestamps: true });

export default mongoose.model("users", userSchema);

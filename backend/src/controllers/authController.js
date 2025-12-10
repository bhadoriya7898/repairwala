// src/controllers/authController.js
import User from "../models/User.model.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

/* ---------------- SIGNUP ---------------- */
export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      role,
    } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Passwords do not match" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const phoneExists = await User.findOne({ phone });
    if (phoneExists)
      return res.status(400).json({ msg: "Mobile number already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashed,
      role,
      isApproved: role === "admin" ? true : false,
    });

    res.json({
      msg: "Signup successful",
      userId: user._id,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- LOGIN ---------------- */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // STEP 1 — User exists?
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // STEP 2 — Password match?
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Incorrect password" });

    // STEP 3 — Profile exists?

    if (user.role === "employee") {
      const profile = await Profile.findOne({ userId: user._id });

      if (!profile) {
        return res.status(200).json({
          msg: "Profile incomplete",
          redirect: "/complete-profile",
          userId: user._id,
          role: user.role,
          isApproved: user.isApproved,
        });
      }

      // Employee has a profile BUT not approved
      if (!user.isApproved) {
        return res.status(403).json({ msg: "Admin approval required" });
      }
    }

    // STEP 4 — Admin approval check
    if (user.role === "employee" && !user.isApproved) {
      return res.status(403).json({
        msg: "Admin approval required",
        redirect: null,
      });
    }

    // STEP 5 — Success
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login successful",
      token,
      userId: user._id,
      role: user.role,
      isApproved: user.isApproved,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- FORGOT / RESET (unchanged) ---------------- */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
    });

    await transport.sendMail({
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`,
    });

    res.json({ msg: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword)
      return res.status(400).json({ msg: "Passwords do not match" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });
    if (user.otpExpiry < Date.now())
      return res.status(400).json({ msg: "OTP expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

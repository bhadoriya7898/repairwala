import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({

  // Relationship with User Model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",   // 👈 your model name
    required: true,
    unique: true,   // One profile per user
  },

  // Basic Professional Details
  category: {
    type: String,
    required: true
  },

  experience: {
    type: Number,
    required: true
  },

  company: {
    type: String,
    required: true
  },

  currentAddress: {
    type: String,
    required: true
  },

  permanentAddress: {
    type: String,
    required: true
  },

  nationalId: {
    type: String,
    required: true
  },

  qualification: {
    type: String,
    required: true
  },

  // Files (Uploaded through multer)
  qualificationDoc: {
    type: String,
    required: true
  },

  photo: {
    type: String,
    required: true
  }

}, { timestamps: true });

export default mongoose.model("profiles", profileSchema);

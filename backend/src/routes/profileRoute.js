import express from "express";
import { completeProfile } from "../controllers/profileController.js";
import { uploadProfile } from "../middlewares/upload.js";

const router = express.Router();

// Complete Profile Route
router.post("/complete-profile", uploadProfile, completeProfile);

export default router;

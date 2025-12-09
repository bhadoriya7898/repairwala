import Profile from "../models/Profile.js";
import User from "../models/User.model.js";

export const completeProfile = async (req, res) => {

  try {
    const {
      userId,
      category,
      experience,
      company,
      currentAddress,
      permanentAddress,
      nationalId,
      qualification
    } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found!" });

    // Prevent Duplicate Profile
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile)
      return res.status(400).json({ msg: "Profile already completed!" });

    // ✅ FIXED FILE HANDLING
    const qualificationDocFile = req.files.find(f => f.fieldname === "qualificationDoc");
    const photoFile = req.files.find(f => f.fieldname === "photo");

    if (!qualificationDocFile || !photoFile) {
      return res.status(400).json({ msg: "Both documents and photo are required" });
    }

    const qualificationDoc = qualificationDocFile.path;
    const photo = photoFile.path;

    // Create profile
    const profile = await Profile.create({
      userId,
      category,
      experience,
      company,
      currentAddress,
      permanentAddress,
      nationalId,
      qualification,
      qualificationDoc,
      photo
    });

    res.json({
      msg: "Profile completed successfully!",
      profile
    });

  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};

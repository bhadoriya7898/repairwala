import express from "express";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import User from "../models/User.model.js";


const router = express.Router();

/* ----------- APPROVE EMPLOYEE ----------- */
router.put("/approve/:id",
  protect,
  authorize("admin"),
  async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ msg: "User not found" });

    user.isApproved = true;
    await user.save();

    res.json({ msg: "Employee approved successfully" });
  }
);

export default router;

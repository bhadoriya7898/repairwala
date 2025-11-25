import express from "express";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard",
  protect,
  authorize("employee"),
  (req, res) => {
    res.json({ msg: "Employee Dashboard" });
  }
);

export default router;

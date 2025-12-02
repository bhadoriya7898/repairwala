import express from "express";
import { uploadBrand } from "../middlewares/upload.js";
import { createBrand, getBrands, deleteBrand } from "../controllers/brandController.js";

const router = express.Router();

// Upload 2 files: brandLogo + brandImage
router.post(
  "/",
  uploadBrand.fields([
    { name: "brandLogo", maxCount: 1 },
    { name: "brandImage", maxCount: 1 },
  ]),
  createBrand
);

router.get("/", getBrands);
router.delete("/:id", deleteBrand);

export default router;

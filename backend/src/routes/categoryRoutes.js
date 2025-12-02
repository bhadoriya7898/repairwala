import express from "express";
import { uploadCategory } from "../middlewares/upload.js";
import { createCategory, getCategories, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", uploadCategory.single("image"), createCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);

export default router;

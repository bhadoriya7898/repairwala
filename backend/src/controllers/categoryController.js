import Category from "../models/Category.model.js";

// ---------------- CREATE CATEGORY ----------------
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/ /g, "-");

    // FIX: Save only public path
const imagePath = req.file
  ? `uploads/categories/${req.file.filename}` 
  : null;

    const newCategory = await Category.create({
      name,
      slug,
      image: imagePath
    });

    return res.json({ success: true, category: newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Category creation failed" });
  }
};


// ---------------- GET ALL CATEGORIES ----------------
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Fetching categories failed" });
  }
};


// ---------------- DELETE CATEGORY ----------------
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Delete failed" });
  }
};

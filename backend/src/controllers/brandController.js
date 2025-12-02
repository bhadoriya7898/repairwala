import Brand from "../models/Brand.model.js";
import Category from "../models/Category.model.js";

export const createBrand = async (req, res) => {
  try {
    const { productName, category, brandName } = req.body;

    if (!req.files || !req.files.brandLogo || !req.files.brandImage) {
      return res.status(400).json({ error: "Images required" });
    }

    // Clean public paths (NO src/)
    const brandLogoPath = `uploads/brandLogo/${req.files.brandLogo[0].filename}`;
    const brandImagePath = `uploads/brandImage/${req.files.brandImage[0].filename}`;

    const newBrand = await Brand.create({
      productName,
      category,
      brandName,
      brandLogo: brandLogoPath,
      brandImage: brandImagePath
    });

    res.json({ success: true, brand: newBrand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Brand creation failed" });
  }
};

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().populate("category").sort({ createdAt: -1 });
    res.json(brands);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Fetch failed" });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Brand deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Delete failed" });
  }
};

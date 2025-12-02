import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String } // uploads/categories/image.png
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);

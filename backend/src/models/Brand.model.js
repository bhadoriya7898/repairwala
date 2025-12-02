import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brandName: { type: String, required: true },

    brandLogo: { type: String },   // uploads/brandLogo/
    brandImage: { type: String }   // uploads/brandImage/
  },
  { timestamps: true }
);

export default mongoose.model("Brand", brandSchema);

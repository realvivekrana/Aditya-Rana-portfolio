import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    caption: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "General" },
    image: { type: imageSchema, required: [true, "Image is required"] },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
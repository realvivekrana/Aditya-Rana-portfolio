import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, trim: true, default: "" },
    date: { type: Date },
    image: { type: imageSchema, default: () => ({}) },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Achievement", achievementSchema);
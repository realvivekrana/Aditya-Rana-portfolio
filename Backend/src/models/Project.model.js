import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "Academic" }, // Academic, Research, Mini Project...
    tags: { type: [String], default: [] },
    link: { type: String, trim: true, default: "" },
    image: { type: imageSchema, default: () => ({}) },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
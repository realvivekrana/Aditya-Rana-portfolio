import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    organization: { type: String, required: [true, "Organization is required"], trim: true },
    location: { type: String, trim: true, default: "" },
    type: {
      type: String,
      enum: ["Internship", "Training", "Job", "Volunteer", "Other"],
      default: "Internship",
    },
    startDate: { type: Date },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, trim: true, default: "" },
    image: { type: imageSchema, default: () => ({}) }, // company logo (optional)
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
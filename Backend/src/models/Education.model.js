import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: [true, "Degree is required"], trim: true },
    institution: { type: String, required: [true, "Institution is required"], trim: true },
    field: { type: String, trim: true, default: "" },
    startYear: { type: String, trim: true, default: "" },
    endYear: { type: String, trim: true, default: "" }, // "Present" bhi likh sakte ho
    grade: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
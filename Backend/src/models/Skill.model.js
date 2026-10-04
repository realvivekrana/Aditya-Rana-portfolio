import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Skill name is required"], trim: true },
    category: { type: String, trim: true, default: "General" }, // Pharmaceutical, Lab, Software, Soft Skills...
    level: { type: Number, min: 0, max: 100, default: 80 },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
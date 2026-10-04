import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    issuer: { type: String, required: [true, "Issuer is required"], trim: true },
    issueDate: { type: Date },
    credentialId: { type: String, trim: true, default: "" },
    credentialUrl: { type: String, trim: true, default: "" },
    image: { type: imageSchema, default: () => ({}) },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
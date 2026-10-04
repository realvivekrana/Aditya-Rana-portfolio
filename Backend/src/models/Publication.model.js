import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    type: {
      type: String,
      enum: ["Research Paper", "Poster", "Seminar", "Presentation", "Article", "Other"],
      default: "Research Paper",
    },
    venue: { type: String, trim: true, default: "" }, // journal / conference / college
    authors: { type: String, trim: true, default: "" },
    date: { type: Date },
    link: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    image: { type: imageSchema, default: () => ({}) },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Publication", publicationSchema);
import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "post";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String, trim: true, default: "" },
    content: { type: String, default: "" },
    image: { type: imageSchema, default: () => ({}) }, // cover image
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// The slug is generated only once, so old links keep working after a title change
blogSchema.pre("validate", async function () {
  if (this.slug || !this.title) return;

  const base = slugify(this.title);
  let slug = base;
  let count = 1;

  while (await this.constructor.exists({ slug })) {
    slug = `${base}-${count++}`;
  }
  this.slug = slug;
});

export default mongoose.model("Blog", blogSchema);
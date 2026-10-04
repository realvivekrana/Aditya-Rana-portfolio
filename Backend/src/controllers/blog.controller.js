import Blog from "../models/Blog.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import createCrudController from "../utils/createCrudController.js";

const crud = createCrudController(Blog, {
  name: "Blog",
  folder: "blogs",
  hasImage: true,
  arrayFields: ["tags"],
  allowedFields: ["title", "excerpt", "content", "tags", "isPublished"],
});

// GET /api/blogs/slug/:slug  (public, views +1)
const getBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug, isPublished: true },
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!blog) throw new ApiError(404, "Blog not found");

  res.status(200).json(new ApiResponse(200, blog));
});

export default { ...crud, getBySlug };
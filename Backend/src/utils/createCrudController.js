import ApiError from "./ApiError.js";
import ApiResponse from "./ApiResponse.js";
import asyncHandler from "./asyncHandler.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

// Builds an array from a JSON array or a comma-separated string
const parseArray = (value) => {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // comma-separated string
  }
  return String(value).split(",");
};

const createCrudController = (
  Model,
  {
    name,
    folder,
    allowedFields,
    arrayFields = [],
    hasImage = false,
    requireImage = false,
  }
) => {
  const pick = (body) => {
    const data = {};
    allowedFields.forEach((field) => {
      if (body[field] === undefined) return;
      data[field] = arrayFields.includes(field)
        ? parseArray(body[field]).map((v) => String(v).trim()).filter(Boolean)
        : body[field];
    });
    return data;
  };

  // Public: published items only
  const getAll = asyncHandler(async (req, res) => {
    const items = await Model.find({ isPublished: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.status(200).json(new ApiResponse(200, items));
  });

  // Admin: drafts and published items
  const getAllAdmin = asyncHandler(async (req, res) => {
    const items = await Model.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(new ApiResponse(200, items));
  });

  const create = asyncHandler(async (req, res) => {
    if (hasImage && requireImage && !req.file) {
      throw new ApiError(400, "Image is required");
    }

    const data = pick(req.body);

    if (hasImage && req.file) {
      data.image = await uploadToCloudinary(req.file.buffer, folder, "image");
    }

    // New items go to the end of the list
    const last = await Model.findOne().sort({ order: -1 }).select("order");
    data.order = last ? last.order + 1 : 0;

    const item = await Model.create(data);
    res.status(201).json(new ApiResponse(201, item, `${name} created successfully`));
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) throw new ApiError(404, `${name} not found`);

    Object.assign(item, pick(req.body));

    if (hasImage) {
      if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, folder, "image");
        await deleteFromCloudinary(item.image?.publicId, "image");
        item.image = uploaded;
      } else if (req.body.removeImage === "true" && !requireImage) {
        await deleteFromCloudinary(item.image?.publicId, "image");
        item.image = { url: "", publicId: "" };
      }
    }

    await item.save();
    res.status(200).json(new ApiResponse(200, item, `${name} updated successfully`));
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) throw new ApiError(404, `${name} not found`);

    if (hasImage) await deleteFromCloudinary(item.image?.publicId, "image");
    await item.deleteOne();

    res.status(200).json(new ApiResponse(200, null, `${name} deleted successfully`));
  });

  // body: { ids: ["id1", "id2", ...] } in the new order
  const reorder = asyncHandler(async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new ApiError(400, "ids array is required");
    }

    await Model.bulkWrite(
      ids.map((id, index) => ({
        updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
      }))
    );

    res.status(200).json(new ApiResponse(200, null, "Order updated successfully"));
  });

  return { getAll, getAllAdmin, create, update, remove, reorder };
};

export default createCrudController;
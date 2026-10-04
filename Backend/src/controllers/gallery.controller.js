import Gallery from "../models/Gallery.model.js";
import createCrudController from "../utils/createCrudController.js";

export default createCrudController(Gallery, {
  name: "Gallery item",
  folder: "gallery",
  hasImage: true,
  requireImage: true,
  allowedFields: ["title", "caption", "category", "isPublished"],
});
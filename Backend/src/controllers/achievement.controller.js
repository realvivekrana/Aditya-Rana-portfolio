import Achievement from "../models/Achievement.model.js";
import createCrudController from "../utils/createCrudController.js";

export default createCrudController(Achievement, {
  name: "Achievement",
  folder: "achievements",
  hasImage: true,
  allowedFields: ["title", "description", "date", "isPublished"],
});
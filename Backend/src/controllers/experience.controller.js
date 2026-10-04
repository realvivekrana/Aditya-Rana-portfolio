import Experience from "../models/Experience.model.js";
import createCrudController from "../utils/createCrudController.js";

export default createCrudController(Experience, {
  name: "Experience",
  folder: "experience",
  hasImage: true,
  allowedFields: ["title", "organization", "location", "type", "startDate", "endDate", "current", "description", "isPublished"],
});
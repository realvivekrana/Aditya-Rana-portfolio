import Project from "../models/Project.model.js";
import createCrudController from "../utils/createCrudController.js";

export default createCrudController(Project, {
  name: "Project",
  folder: "projects",
  hasImage: true,
  arrayFields: ["tags"],
  allowedFields: ["title", "description", "category", "tags", "link", "featured", "isPublished"],
});
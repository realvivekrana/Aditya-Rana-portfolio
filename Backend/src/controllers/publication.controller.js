import Publication from "../models/Publication.model.js";
import createCrudController from "../utils/createCrudController.js";

export default createCrudController(Publication, {
  name: "Publication",
  folder: "publications",
  hasImage: true,
  allowedFields: ["title", "type", "venue", "authors", "date", "link", "description", "isPublished"],
});
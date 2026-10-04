import Education from "../models/Education.model.js";
import createCrudController from "../utils/createCrudController.js";

export default createCrudController(Education, {
  name: "Education",
  allowedFields: ["degree", "institution", "field", "startYear", "endYear", "grade", "description", "isPublished"],
});
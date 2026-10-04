import Skill from "../models/Skill.model.js";
import createCrudController from "../utils/createCrudController.js";

export default createCrudController(Skill, {
  name: "Skill",
  allowedFields: ["name", "category", "level", "isPublished"],
});
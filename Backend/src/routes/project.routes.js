import createCrudRouter from "../utils/createCrudRouter.js";
import controller from "../controllers/project.controller.js";

export default createCrudRouter(controller, { hasImage: true });
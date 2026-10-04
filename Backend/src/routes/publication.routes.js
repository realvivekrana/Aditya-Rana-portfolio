import createCrudRouter from "../utils/createCrudRouter.js";
import controller from "../controllers/publication.controller.js";

export default createCrudRouter(controller, { hasImage: true });
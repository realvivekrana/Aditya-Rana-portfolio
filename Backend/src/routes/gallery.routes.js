import createCrudRouter from "../utils/createCrudRouter.js";
import controller from "../controllers/gallery.controller.js";

export default createCrudRouter(controller, { hasImage: true });
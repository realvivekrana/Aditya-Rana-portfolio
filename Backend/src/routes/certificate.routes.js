import createCrudRouter from "../utils/createCrudRouter.js";
import controller from "../controllers/certificate.controller.js";

export default createCrudRouter(controller, { hasImage: true });
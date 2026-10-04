import createCrudRouter from "../utils/createCrudRouter.js";
import controller from "../controllers/achievement.controller.js";

export default createCrudRouter(controller, { hasImage: true });
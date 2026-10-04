import createCrudRouter from "../utils/createCrudRouter.js";
import controller from "../controllers/blog.controller.js";

const router = createCrudRouter(controller, { hasImage: true });

router.get("/slug/:slug", controller.getBySlug);

export default router;
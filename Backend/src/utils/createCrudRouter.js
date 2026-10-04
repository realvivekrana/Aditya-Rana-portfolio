import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const createCrudRouter = (controller, { hasImage = false } = {}) => {
  const router = Router();
  const imageMiddleware = hasImage ? [upload.single("image")] : [];

  router.get("/", controller.getAll);
  router.get("/admin/all", protect, controller.getAllAdmin);
  router.put("/reorder", protect, controller.reorder); // :id se pehle hona zaroori hai
  router.post("/", protect, ...imageMiddleware, controller.create);
  router.put("/:id", protect, ...imageMiddleware, controller.update);
  router.delete("/:id", protect, controller.remove);

  return router;
};

export default createCrudRouter;
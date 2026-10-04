import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/", getProfile);

router.put(
  "/",
  protect,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

export default router;
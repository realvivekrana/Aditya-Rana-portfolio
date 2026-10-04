import { Router } from "express";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import educationRoutes from "./education.routes.js";
import skillRoutes from "./skill.routes.js";
import experienceRoutes from "./experience.routes.js";
import certificateRoutes from "./certificate.routes.js";
import achievementRoutes from "./achievement.routes.js";
import projectRoutes from "./project.routes.js";
import publicationRoutes from "./publication.routes.js";
import galleryRoutes from "./gallery.routes.js";
import blogRoutes from "./blog.routes.js";
import messageRoutes from "./message.routes.js";
import settingsRoutes from "./settings.routes.js";
import dashboardRoutes from "./dashboard.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/education", educationRoutes);
router.use("/skills", skillRoutes);
router.use("/experience", experienceRoutes);
router.use("/certificates", certificateRoutes);
router.use("/achievements", achievementRoutes);
router.use("/projects", projectRoutes);
router.use("/publications", publicationRoutes);
router.use("/gallery", galleryRoutes);
router.use("/blogs", blogRoutes);
router.use("/messages", messageRoutes);
router.use("/settings", settingsRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
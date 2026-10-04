import { Router } from "express";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";
import {
  createMessage,
  getMessages,
  markRead,
  deleteMessage,
} from "../controllers/message.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

const router = Router();

// ek IP se 15 minute me max 5 messages
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many messages sent. Please try again later." },
});

router.post(
  "/",
  contactLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name is too long"),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("subject").optional().trim().isLength({ max: 150 }).withMessage("Subject is too long"),
    body("message")
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Message must be between 10 and 2000 characters"),
  ],
  validate,
  createMessage
);

router.get("/", protect, getMessages);
router.patch("/:id/read", protect, markRead);
router.delete("/:id", protect, deleteMessage);

export default router;
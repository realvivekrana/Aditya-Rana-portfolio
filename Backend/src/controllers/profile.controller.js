import Profile from "../models/Profile.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";

const TEXT_FIELDS = ["fullName", "tagline", "bio", "email", "phone", "location"];
const SOCIAL_FIELDS = [
  "linkedin",
  "github",
  "twitter",
  "instagram",
  "facebook",
  "website",
];

// roles ko JSON array ya comma-separated string dono se parse karo
const parseRoles = (value) => {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // comma-separated string
  }
  return String(value)
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);
};

// GET /api/profile  (public)
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne();
  res.status(200).json(new ApiResponse(200, profile || {}));
});

// PUT /api/profile  (admin)
export const updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = new Profile();

  TEXT_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) profile[field] = req.body[field];
  });

  SOCIAL_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) profile.socials[field] = req.body[field];
  });

  if (req.body.roles !== undefined) {
    profile.roles = parseRoles(req.body.roles).map((r) => String(r).trim()).filter(Boolean);
  }

  // Photo
  const photoFile = req.files?.photo?.[0];
  if (photoFile) {
    const uploaded = await uploadToCloudinary(photoFile.buffer, "profile", "image");
    await deleteFromCloudinary(profile.photo?.publicId, "image");
    profile.photo = uploaded;
  }

  // Resume (PDF)
  const resumeFile = req.files?.resume?.[0];
  if (resumeFile) {
    const uploaded = await uploadToCloudinary(resumeFile.buffer, "resume", "raw");
    await deleteFromCloudinary(profile.resume?.publicId, "raw");
    profile.resume = uploaded;
  }

  await profile.save();

  res.status(200).json(new ApiResponse(200, profile, "Profile updated successfully"));
});
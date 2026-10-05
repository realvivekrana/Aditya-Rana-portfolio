import Settings, { SECTION_KEYS } from "../models/Settings.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const TEXT_FIELDS = ["siteTitle", "siteDescription", "footerText", "primaryColor", "defaultMode"];

// GET /api/settings  (public) - returns defaults when no settings exist yet
export const getSettings = asyncHandler(async (req, res) => {
  const settings = (await Settings.findOne()) || new Settings();
  res.status(200).json(new ApiResponse(200, settings));
});

// PUT /api/settings  (admin)
export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = new Settings();

  TEXT_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) settings[field] = req.body[field];
  });

  if (req.body.keywords !== undefined) {
    const raw = Array.isArray(req.body.keywords)
      ? req.body.keywords
      : String(req.body.keywords).split(",");
    settings.keywords = raw.map((k) => String(k).trim()).filter(Boolean);
  }

  if (req.body.sections && typeof req.body.sections === "object") {
    SECTION_KEYS.forEach((key) => {
      if (typeof req.body.sections[key] === "boolean") {
        settings.sections[key] = req.body.sections[key];
      }
    });
  }

  await settings.save();
  res.status(200).json(new ApiResponse(200, settings, "Settings updated successfully"));
});
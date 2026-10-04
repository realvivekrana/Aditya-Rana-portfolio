import mongoose from "mongoose";

export const SECTION_KEYS = [
  "education",
  "skills",
  "experience",
  "projects",
  "certificates",
  "achievements",
  "publications",
  "gallery",
  "blog",
  "contact",
];

const sectionFlag = { type: Boolean, default: true };

const settingsSchema = new mongoose.Schema(
  {
    // SEO
    siteTitle: { type: String, trim: true, default: "Portfolio" },
    siteDescription: { type: String, trim: true, default: "" },
    keywords: { type: [String], default: [] },
    footerText: { type: String, trim: true, default: "" },

    // Theme
    primaryColor: {
      type: String,
      trim: true,
      default: "#0ea5e9",
      match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Primary color must be a valid hex code"],
    },
    defaultMode: { type: String, enum: ["light", "dark"], default: "light" },

    // Kaunsa section site par dikhana hai
    sections: Object.fromEntries(SECTION_KEYS.map((key) => [key, sectionFlag])),
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
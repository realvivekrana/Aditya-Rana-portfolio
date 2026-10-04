import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  { url: { type: String, default: "" }, publicId: { type: String, default: "" } },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, default: "" },
    tagline: { type: String, trim: true, default: "" },
    roles: { type: [String], default: [] }, // hero me typing animation ke liye
    bio: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, lowercase: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    photo: { type: fileSchema, default: () => ({}) },
    resume: { type: fileSchema, default: () => ({}) },
    socials: {
      linkedin: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
      twitter: { type: String, trim: true, default: "" },
      instagram: { type: String, trim: true, default: "" },
      facebook: { type: String, trim: true, default: "" },
      website: { type: String, trim: true, default: "" },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
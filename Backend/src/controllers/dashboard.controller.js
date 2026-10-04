import Education from "../models/Education.model.js";
import Skill from "../models/Skill.model.js";
import Experience from "../models/Experience.model.js";
import Certificate from "../models/Certificate.model.js";
import Achievement from "../models/Achievement.model.js";
import Project from "../models/Project.model.js";
import Publication from "../models/Publication.model.js";
import Gallery from "../models/Gallery.model.js";
import Blog from "../models/Blog.model.js";
import Message from "../models/Message.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET /api/dashboard  (admin)
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    education,
    skills,
    experience,
    certificates,
    achievements,
    projects,
    publications,
    gallery,
    blogs,
    totalMessages,
    unreadMessages,
    viewsAgg,
    recentMessages,
  ] = await Promise.all([
    Education.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Certificate.countDocuments(),
    Achievement.countDocuments(),
    Project.countDocuments(),
    Publication.countDocuments(),
    Gallery.countDocuments(),
    Blog.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ isRead: false }),
    Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
    Message.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      counts: {
        education,
        skills,
        experience,
        certificates,
        achievements,
        projects,
        publications,
        gallery,
        blogs,
      },
      totalMessages,
      unreadMessages,
      totalBlogViews: viewsAgg[0]?.total || 0,
      recentMessages,
    })
  );
});
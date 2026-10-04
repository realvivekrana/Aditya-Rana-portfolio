import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw new ApiError(401, "Not authorized, token missing");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(401, "Not authorized, token invalid or expired");
  }

  const admin = await Admin.findById(decoded.id);
  if (!admin) throw new ApiError(401, "Admin no longer exists");

  req.admin = admin;
  next();
});
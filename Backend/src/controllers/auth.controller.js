import Admin from "../models/Admin.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !(await admin.matchPassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(admin._id);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        admin: { _id: admin._id, name: admin.name, email: admin.email },
      },
      "Login successful"
    )
  );
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.admin;
  res.status(200).json(new ApiResponse(200, { _id, name, email }));
});

// PUT /api/auth/change-password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin._id).select("+password");

  if (!(await admin.matchPassword(currentPassword))) {
    throw new ApiError(400, "Current password is incorrect");
  }

  admin.password = newPassword;
  await admin.save();

  res.status(200).json(new ApiResponse(200, null, "Password changed successfully"));
});
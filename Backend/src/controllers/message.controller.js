import Message from "../models/Message.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// POST /api/messages  (public contact form)
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  await Message.create({ name, email, subject, message });

  res.status(201).json(new ApiResponse(201, null, "Message sent successfully"));
});

// GET /api/messages?unread=true  (admin)
export const getMessages = asyncHandler(async (req, res) => {
  const filter = req.query.unread === "true" ? { isRead: false } : {};
  const messages = await Message.find(filter).sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, messages));
});

// PATCH /api/messages/:id/read  (admin) body: { isRead: true/false }
export const markRead = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) throw new ApiError(404, "Message not found");

  message.isRead = req.body.isRead !== false;
  await message.save();

  res.status(200).json(new ApiResponse(200, message, "Message updated"));
});

// DELETE /api/messages/:id  (admin)
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) throw new ApiError(404, "Message not found");

  await message.deleteOne();
  res.status(200).json(new ApiResponse(200, null, "Message deleted successfully"));
});
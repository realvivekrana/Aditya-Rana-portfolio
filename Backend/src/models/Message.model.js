import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true, maxlength: 100 },
    email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true },
    subject: { type: String, trim: true, default: "", maxlength: 150 },
    message: { type: String, required: [true, "Message is required"], trim: true, maxlength: 2000 },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
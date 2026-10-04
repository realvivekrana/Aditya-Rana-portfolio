import multer from "multer";
import ApiError from "../utils/ApiError.js";

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    return file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new ApiError(400, "Resume must be a PDF file"));
  }

  if (file.mimetype.startsWith("image/")) return cb(null, true);
  cb(new ApiError(400, "Only image files are allowed"));
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default upload;
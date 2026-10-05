import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Uploads a buffer to Cloudinary
export const uploadToCloudinary = (buffer, folder, resourceType = "image") =>
  new Promise((resolve, reject) => {
    const options = {
      folder: `aditya-portfolio/${folder}`,
      resource_type: resourceType,
    };

    if (resourceType === "image") {
      options.transformation = [{ width: 1600, crop: "limit", quality: "auto" }];
    }
    if (resourceType === "raw") {
      options.public_id = `file-${Date.now()}.pdf`;
    }

    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve({ url: result.secure_url, publicId: result.public_id });
    });

    stream.end(buffer);
  });

// Deletes an old file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
};

export default cloudinary;
import "dotenv/config";
import mongoose from "mongoose";
import Admin from "../models/Admin.model.js";

const run = async () => {
  try {
    const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    }

    await mongoose.connect(MONGO_URI);

    const exists = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (exists) {
      console.log("Admin already exists:", exists.email);
    } else {
      await Admin.create({
        name: "Aditya Rana",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });
      console.log("Admin created:", ADMIN_EMAIL);
    }
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
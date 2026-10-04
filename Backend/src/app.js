import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
// Express 5: body na ho toh req.body undefined rehta hai, isliye default {}
app.use((req, res, next) => {
  req.body = req.body || {};
  next();
});
app.use(cookieParser());

// Uploaded files serve karne ke liye
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
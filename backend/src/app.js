import express from "express";
import router from "./routes/user.js";
import cloudinary from "./config/cloudinary.js";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./errors/globalErrorHandler.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./temp",
  })
);
app.use("/backend/api/v1", router);
app.use(globalErrorHandler);
export default app;

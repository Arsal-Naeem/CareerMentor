import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/connectDB.js";

import authRoutes from "./routes/authRoute.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import adminRoutes from "./routes/admin/adminRoute.js";

import startApp from "./config/sync.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogsRoutes);

app.use("/api/admin", adminRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  connectDB();
  startApp();
  console.log(`Server is running on port ${PORT}`);
});

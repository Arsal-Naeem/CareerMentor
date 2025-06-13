import express from "express";
import { upload } from "../utils/S3.js";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getUserBlogsController,
  updateBlogController,
} from "../controllers/blogController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// router.get("/external-blogs", getAllBlogsController);

router.post(
  "/add-new-blog",
  verifyToken,
  upload.single("coverImage"),
  createBlogController
);

router.patch(
  "/update-blog/:blogId",
  verifyToken,
  upload.single("coverImage"),
  updateBlogController
);

router.delete("/delete-blog/:blogId", verifyToken, deleteBlogController);

router.get("/get-all-blogs", getAllBlogsController);

router.get("/get-user-blogs", verifyToken, getUserBlogsController);

export default router;

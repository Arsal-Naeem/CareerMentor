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

/**
 * @swagger
 * /api/blogs/add-new-blog:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/add-new-blog",
  verifyToken,
  upload.single("coverImage"),
  createBlogController
);

/**
 * @swagger
 * /api/blogs/update-blog/{blogId}:
 *   patch:
 *     summary: Update an existing blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.patch(
  "/update-blog/:blogId",
  verifyToken,
  upload.single("coverImage"),
  updateBlogController
);

/**
 * @swagger
 * /api/blogs/delete-blog/{blogId}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete("/delete-blog/:blogId", verifyToken, deleteBlogController);

/**
 * @swagger
 * /api/blogs/get-all-blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of all blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   coverImage:
 *                     type: string
 *                   createdAt:
 *                     type: string
 */
router.get("/get-all-blogs", getAllBlogsController);

/**
 * @swagger
 * /api/blogs/get-user-blogs:
 *   get:
 *     summary: Get blogs for authenticated user
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's blogs
 *       401:
 *         description: Unauthorized
 */
router.get("/get-user-blogs", verifyToken, getUserBlogsController);

export default router;

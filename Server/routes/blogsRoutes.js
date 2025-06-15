import express from "express";
import { upload } from "../utils/S3.js";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getAlltagsController,
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
 *             required:
 *               - title
 *               - shortDesc
 *               - longDesc
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *               shortDesc:
 *                 type: string
 *               longDesc:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: JSON stringified array of tags (e.g. '["react", "nodejs"]')
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 blog:
 *                   $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Missing or invalid fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
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
 *               shortDesc:
 *                 type: string
 *               longDesc:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: JSON stringified array of tags (optional)
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Invalid input or nothing to update
 *       403:
 *         description: Unauthorized to update this blog
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
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
 *       403:
 *         description: Unauthorized to delete this blog
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.delete("/delete-blog/:blogId", verifyToken, deleteBlogController);

/**
 * @swagger
 * /api/blogs/get-all-blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of blogs per page
 *     responses:
 *       200:
 *         description: List of all blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       shortDesc:
 *                         type: string
 *                       longDesc:
 *                         type: string
 *                       author:
 *                         type: string
 *                       publishedAt:
 *                         type: string
 *                         format: date-time
 *                       coverImage:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *       500:
 *         description: Server error
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/get-user-blogs", verifyToken, getUserBlogsController);

/**
 * @swagger
 * /api/blogs/tags:
 *   get:
 *     summary: Get all available blog tags
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all blog tags
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       usageCount:
 *                         type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/tags", verifyToken, getAlltagsController);

export default router;

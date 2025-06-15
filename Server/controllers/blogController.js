import { sequelize } from "../config/connectDB.js";
import { User, Blogs, Tag } from "../models/index.js";
import { deleteFileFromS3, uploadFileToS3 } from "../utils/S3.js";

const calculateReadTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const createBlogController = async (req, res) => {
  let { title, shortDesc, longDesc, tags } = req.body;
  const userId = req.userId;

  if (typeof tags === "string") {
    try {
      tags = JSON.parse(tags);
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid tags format" });
    }
  }

  if (!title || !shortDesc || !longDesc || !Array.isArray(tags)) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const author = `${user.firstName} ${user.lastName}`;

    const t = await sequelize.transaction();

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadFileToS3(req.file); // Upload manually
    }

    const blog = await Blogs.create(
      {
        userId,
        title,
        shortDesc,
        longDesc,
        author,
        coverImage: imageUrl || null,
        timeToRead: calculateReadTime(longDesc),
      },
      { transaction: t }
    );

    const tagInstances = await Promise.all(
      tags.map(async (tagName) => {
        const [tag, created] = await Tag.findOrCreate({
          where: { name: tagName.trim().toLowerCase() },
          defaults: { name: tagName.trim().toLowerCase() },
          transaction: t,
        });

        if (!created) {
          // If tag already existed, increment the usage count
          tag.usageCount += 1;
          await tag.save({ transaction: t });
        }
        return tag;
      })
    );

    await blog.setTags(tagInstances, { transaction: t });

    await t.commit();

    return res
      .status(201)
      .json({ success: true, message: "Blog created", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllBlogsController = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    // Convert to integers and validate
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const blogs = await Blogs.findAll({
      include: [
        {
          model: User,
          as: "authorInfo",
          attributes: ["firstName", "lastName"],
        },
        {
          model: Tag,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      offset: (page - 1) * limit,
      limit,
      where: { status: "approved" },
      order: [["publishedAt", "DESC"]],
    });

    const formattedBlogs = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      shortDesc: blog.shortDesc,
      longDesc: blog.longDesc,
      author: `${blog.authorInfo.firstName} ${blog.authorInfo.lastName}`,
      publishedAt: blog.publishedAt,
      coverImage: blog.coverImage || null,
      tags: blog.Tags.map((tag) => tag.name),
    }));

    res.status(200).json({
      success: true,
      page,
      limit,
      blogs: formattedBlogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateBlogController = async (req, res) => {
  const userId = req.userId;
  const { blogId } = req.params;
  let { title, shortDesc, longDesc, tags } = req.body;

  // Parse tags if sent as string
  if (typeof tags === "string") {
    try {
      tags = JSON.parse(tags);
    } catch (err) {
      return res.status(400).json({ message: "Invalid tags format" });
    }
  }

  if (!title && !shortDesc && !longDesc && !Array.isArray(tags) && !req.file) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  try {
    const blog = await Blogs.findOne({
      where: { id: blogId },
      include: [{ model: User, as: "authorInfo" }],
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this blog" });
    }

    const t = await sequelize.transaction();

    // Upload and update image if new file provided
    if (req.file) {
      if (blog.coverImage) {
        try {
          await deleteFileFromS3(blog.coverImage);
        } catch (err) {
          console.error("Failed to delete old image from S3:", err.message);
        }
      }

      const newImageUrl = await uploadFileToS3(req.file);
      blog.coverImage = newImageUrl;
    }

    // Update blog fields
    if (title) blog.title = title;
    if (shortDesc) blog.shortDesc = shortDesc;
    if (longDesc) blog.longDesc = longDesc;

    blog.status = "pending"; // Set to pending after update

    // Tag logic
    if (Array.isArray(tags)) {
      const tagInstances = await Promise.all(
        tags.map(async (tagName) => {
          const [tag, created] = await Tag.findOrCreate({
            where: { name: tagName.trim().toLowerCase() },
            defaults: { name: tagName.trim().toLowerCase(), usageCount: 1 },
            transaction: t,
          });

          if (!created) {
            tag.usageCount += 1;
            await tag.save({ transaction: t });
          }

          return tag;
        })
      );

      await blog.setTags(tagInstances, { transaction: t });
    }

    await blog.save({ transaction: t });
    await t.commit();

    res.status(200).json({
      success: true,
      message: "Blog updated and sent for re-approval.",
    });
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteBlogController = async (req, res) => {
  const userId = req.userId;
  const { blogId } = req.params;

  try {
    const blog = await Blogs.findOne({
      where: { id: blogId },
      include: [{ model: User, as: "authorInfo" }],
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this blog" });
    }

    const t = await sequelize.transaction();

    // Delete cover image from S3 if present
    if (blog.coverImage) {
      try {
        await deleteFileFromS3(blog.coverImage);
      } catch (err) {
        console.error("Error deleting image from S3:", err.message);
      }
    }

    // Remove blog-tag relations
    await blog.setTags([], { transaction: t });

    // Delete blog
    await blog.destroy({ transaction: t });
    await t.commit();

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserBlogsController = async (req, res) => {
  const userId = req.userId;

  try {
    const blogs = await Blogs.findAll({
      where: { userId },
    });

    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAlltagsController = async (req, res) => {
  try {
    const tags = await Tag.findAll({ attributes: ["name", "usageCount"] });
    if (!tags) {
      return res.status(404).json({ success: false, message: "No tags found" });
    }
    res.status(200).json({ success: true, tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

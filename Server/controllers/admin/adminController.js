import { User, Blogs, Tag } from "../../models/index.js";

export const getAllBlogsController = async (req, res) => {
  //getallblogs
  try {
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
      where: { status: "pending" },
      order: [["publishedAt", "DESC"]],
    });

    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

export const approveBlogController = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { status } = req.body;

    // Assuming you have a Blog model to interact with your database
    const blog = await Blogs.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the status is valid
    const validStatuses = ["approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    blog.status = status;
    await blog.save();

    res.status(200).json({ message: "Blog approved successfully", blog });
  } catch (error) {
    console.error("Error approving blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

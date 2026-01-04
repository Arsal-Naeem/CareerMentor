import {
  errorResponse,
  successResponse,
} from "../../../utils/handlers/reponseHandler.js";
import {
  createBlogService,
  getAllBlogsService,
  getBlogBySlugService,
  getBlogTagsService,
} from "./blogServices.js";

export const createBlogController = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, shortDesc, longDesc, timeToRead, tags } = req.body;
    const file = req.file;

    let parsedLongDesc = longDesc;
    let parsedTags = tags;

    try {
      if (typeof longDesc === "string") {
        parsedLongDesc = JSON.parse(longDesc);
      }
    } catch (e) {
      parsedLongDesc = longDesc;
    }

    try {
      if (typeof tags === "string") {
        parsedTags = JSON.parse(tags);
      }
    } catch (e) {
      parsedTags = tags;
    }

    // ✅ Basic validations
    if (!title?.trim() || !shortDesc?.trim() || !parsedLongDesc) {
      return errorResponse(
        res,
        "Title, short description, and long description are required"
      );
    }
    if (!file) return errorResponse(res, "Cover image is required");

    // ✅ Pass parsed data to service
    const newBlog = await createBlogService({
      userId,
      title,
      shortDesc,
      longDesc: parsedLongDesc,
      timeToRead,
      tags: parsedTags,
      file,
    });

    return successResponse(
      res,
      {
        blogId: newBlog.id,
        title: newBlog.title,
        coverImage: newBlog.coverImage,
      },
      "Blog created successfully"
    );
  } catch (err) {
    console.error(err);
    return errorResponse(res, err.message || "Something went wrong");
  }
};

export const getAllBlogsController = async (req, res) => {
  try {
    const { page = 1, limit = 9, search = "", tagName = null } = req.query;

    const data = await getAllBlogsService({
      page: Number(page),
      limit: Number(limit),
      search,
      tagName,
    });

    return successResponse(res, data, "Get all blogs - Admin");
  } catch (err) {
    console.error(err);
    return errorResponse(
      res,
      err.message || "Something went wrong while getting blogs"
    );
  }
};

export const getBlogBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return errorResponse(res, "Blog slug is required");
    }

    const blog = await getBlogBySlugService(slug);

    return successResponse(res, blog, "Blog fetched successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res, err.message || "Something went wrong");
  }
};

export const getBlogTagsController = async (req, res) => {
  try {
    const tags = await getBlogTagsService();

    return successResponse(res, { tags }, "Blog tags fetched successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res, err.message || "Something went wrong");
  }
};

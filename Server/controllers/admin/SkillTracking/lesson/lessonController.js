import {
  errorResponse,
  successResponse,
} from "../../../../utils/handlers/reponseHandler.js";
import {
  GetModuleAndLessons,
  PostLesson,
  GetSingleLesson,
  DeleteLesson,
} from "./lessonService.js";

export const postLesson = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const {
      title,
      description,
      isMandatory,
      resources,
      learningPoints,
      examples,
    } = req.body;

    if (!moduleId) {
      return errorResponse(res, "Module ID is required", "Bad Request", 400);
    }

    if (!title || !description) {
      return errorResponse(
        res,
        "Title and Description are required",
        "Bad Request",
        400
      );
    }

    const newLesson = await PostLesson({
      moduleId,
      title,
      description,
      isMandatory,
      resources,
      learningPoints,
      examples,
    });

    return successResponse(res, newLesson, "Lesson created successfully", 201);
  } catch (error) {
    console.error("Error in postLesson:", error);
    return errorResponse(res, error.message, "Internal Server Error", 500);
  }
};

export const getModuleAndLessons = async (req, res) => {
  try {
    const { moduleId } = req.params;

    if (!moduleId) {
      return errorResponse(res, "Module ID is required", "Bad Request", 400);
    }

    const moduleAndLessons = await GetModuleAndLessons(moduleId);
    return successResponse(
      res,
      moduleAndLessons,
      "Module and lessons fetched successfully",
      200
    );
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, "Internal Server Error");
  }
};

export const getSingleLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    if (!lessonId) {
      return errorResponse(res, "Lesson ID is required", "Bad Request", 400);
    }

    const data = await GetSingleLesson(lessonId);

    return successResponse(res, data, "Lesson fetched successfully", 200);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, "Internal Server Error");
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    if (!lessonId) {
      return errorResponse(res, "Lesson ID is required", "Bad Request", 400);
    }
    // Assuming DeleteLesson is a service function that handles the deletion logic
    const result = await DeleteLesson(lessonId);
    return successResponse(res, result, "Lesson deleted successfully", 200);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, "Internal Server Error");
  }
};

import {
  Lesson,
  LessonExample,
  LessonLearningPoint,
  LessonResource,
  Module,
  UserLessonProgress,
} from "../../models/index.js";

export const PostLessonEnrollment = async ({ userId }) => {

  
};

export const GetAllUserLessons = async ({ moduleId }) => {
  const moduleWithLessons = await Module.findByPk(moduleId, {
    attributes: ["id", "title", "description", "totalXp", "badge", "slug"],
    include: [
      {
        model: Lesson,
        as: "lessons", 
        attributes: [
          "id",
          "title",
          "description",
          "isMandatory",
          "sequence",
          "createdAt",
          "updatedAt",
        ],
        order: [["sequence", "ASC"]],
      },
    ],
  });

  if (!moduleWithLessons) return null;

  // convert to plain object to safely return as JSON
  return moduleWithLessons.get({ plain: true });
};

export const GetDetailLesson = async (lessonId) => {
  if (!lessonId) return null;

  const lesson = await Lesson.findByPk(lessonId, {
    attributes: ["id", "title", "description", "isMandatory", "sequence", "createdAt", "updatedAt"],
    include: [
      {
        model: LessonExample,
        as: "examples",
        attributes: [ "codeSnippet", "description"],
        order: [["createdAt", "ASC"]],
      },
      {
        model: LessonLearningPoint,
        as: "learningPoints",
        attributes: [ "point", "subPoints"], // include subPoints JSON
        order: [[ "ASC"]],
      },
      {
        model: LessonResource,
        as: "resources",
        attributes: ["type", "url"],
        order: [["ASC"]],
      },
    ],
  });

  if (!lesson) return null;

  // convert plain object and parse JSON subPoints if stored as string
  const result = lesson.get({ plain: true });
  if (result.learningPoints && result.learningPoints.length > 0) {
    result.learningPoints = result.learningPoints.map((lp) => ({
      ...lp,
      subPoints: typeof lp.subPoints === "string" ? JSON.parse(lp.subPoints) : lp.subPoints || [],
    }));
  }

  return result;
};

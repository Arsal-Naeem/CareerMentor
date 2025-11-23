import { generateLessonProgress } from "../../helper/lessonHelper.js";
import {
  Lesson,
  LessonExample,
  LessonLearningPoint,
  LessonResource,
  Module,
  UserLessonProgress,
  XpWeight,
} from "../../models/index.js";

export const PostLessonEnrollment = async ({ userId, moduleId }) => {
  // 1️⃣ Check if user already enrolled in this module
  const existingProgress = await UserLessonProgress.findOne({
    where: { userId, moduleId },
  });
  if (existingProgress) {
    throw new Error("User is already enrolled in this module");
  }

  // 2️⃣ Fetch module
  const module = await Module.findByPk(moduleId, {
    attributes: ["id", "totalXP", "xpWeightId"],
  });
  if (!module) throw new Error("Module not found");

  // 3️⃣ Fetch XP weight
  const xpWeight = await XpWeight.findByPk(module.xpWeightId);
  if (!xpWeight) throw new Error("XP Weight not found");

  // 4️⃣ Fetch lessons ordered by sequence
  const lessons = await Lesson.findAll({
    where: { moduleId },
    attributes: ["id", "sequence"],
    order: [["sequence", "ASC"]],
  });
  if (!lessons.length) throw new Error("No lessons found for this module");

  // 5️⃣ Calculate total lesson XP
  const totalLessonXP = module.totalXP * xpWeight.lesson_weight;

  // 6️⃣ Generate lesson progress array
  const lessonProgress = generateLessonProgress(userId, module.id, lessons, totalLessonXP);

  // 7️⃣ Insert all lesson progress into DB
  const insertedProgress = await UserLessonProgress.bulkCreate(lessonProgress, { returning: true });

  // 8️⃣ Optional: Console log for debugging
  insertedProgress.forEach((item, i) => {
    console.log(`Inserted Lesson Progress ${i + 1}:`, item.dataValues);
  });

  return insertedProgress;

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
      },
    ],
    order: [[{ model: Lesson, as: "lessons" }, "sequence", "ASC"]],
  });

  if (!moduleWithLessons) return null;

  return moduleWithLessons.get({ plain: true });
};

export const GetDetailLesson = async (lessonId) => {
  if (!lessonId) return null;

  const lesson = await Lesson.findByPk(lessonId, {
    attributes: [
      "id",
      "title",
      "description",
      "isMandatory",
      "sequence",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: LessonExample,
        as: "examples",
        attributes: ["codeSnippet", "description", "descriptionPoints"],
        order: [["createdAt", "ASC"]],
      },
      {
        model: LessonLearningPoint,
        as: "learningPoints",
        attributes: ["point", "subPoints"], // include subPoints JSON
        order: [["ASC"]],
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

  // Convert to plain object
  const result = lesson.get({ plain: true });

  // Parse learningPoints.subPoints if stored as string
  if (result.learningPoints && result.learningPoints.length > 0) {
    result.learningPoints = result.learningPoints.map((lp) => ({
      ...lp,
      subPoints:
        typeof lp.subPoints === "string"
          ? JSON.parse(lp.subPoints)
          : lp.subPoints || [],
    }));
  }

  // Parse examples.descriptionPoints if stored as string
  if (result.examples && result.examples.length > 0) {
    result.examples = result.examples.map((ex) => ({
      ...ex,
      descriptionPoints:
        typeof ex.descriptionPoints === "string"
          ? JSON.parse(ex.descriptionPoints)
          : ex.descriptionPoints || [],
    }));
  }

  return result;
};

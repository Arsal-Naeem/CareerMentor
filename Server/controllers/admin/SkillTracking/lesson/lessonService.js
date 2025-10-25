import {
  Lesson,
  LessonExample,
  LessonLearningPoint,
  LessonResource,
  Module,
} from "../../../../models/index.js";
import { sequelize } from "../../../../config/connectDB.js";

export const PostLesson = async (lessonData) => {
  const { moduleId, title, description, isMandatory, resources, learningPoints, examples } = lessonData;
  const transaction = await sequelize.transaction();

  let lesson;

  try {
    const lastLesson = await Lesson.findOne({
      where: { moduleId },
      order: [["sequence", "DESC"]],
      transaction,
    });

    const nextSequence = lastLesson ? lastLesson.sequence + 1 : 1;

    lesson = await Lesson.create(
      { moduleId, title, description, isMandatory, sequence: nextSequence },
      { transaction }
    );

    if (Array.isArray(resources) && resources.length > 0) {
      await LessonResource.bulkCreate(
        resources.map((r) => ({
          lessonId: lesson.id,
          type: r.type || "Other",
          url: r.url,
        })),
        { transaction }
      );
    }

    if (Array.isArray(learningPoints) && learningPoints.length > 0) {
      await LessonLearningPoint.bulkCreate(
        learningPoints.map((point) => ({
          lessonId: lesson.id,
          point,
        })),
        { transaction }
      );
    }

    if (Array.isArray(examples) && examples.length > 0) {
      await LessonExample.bulkCreate(
        examples.map((ex) => ({
          lessonId: lesson.id,
          codeSnippet: ex.codeSnippet || null,
          description: ex.description || null,
        })),
        { transaction }
      );
    }

    await transaction.commit(); // ✅ commit once everything in txn succeeds
  } catch (error) {
    await transaction.rollback(); // only rollback if still pending
    throw new Error(`Lesson creation failed: ${error.message}`);
  }

  // ✅ Fetch lesson outside transaction safely
 const createdLesson = await Lesson.findOne({
  where: { id: lesson.id },
  include: [
    { model: LessonResource, as: "resources" },
    { model: LessonLearningPoint, as: "learningPoints" },
    { model: LessonExample, as: "examples" },
  ],
});


  return createdLesson.get({ plain: true });
};



export const GetModuleAndLessons = async (moduleId) => {
  const moduleWithLessons = await Module.findByPk(moduleId, {
    attributes: ["id", "title", "description", "totalXp", "badge", "slug"],
    include: [
      {
        model: Lesson,
        as: "lessons", // must match association alias
        attributes: ["id", "title", "description", "isMandatory", "sequence", "createdAt", "updatedAt"],
        order: [["sequence", "ASC"]] // optional: order lessons
      }
    ]
  });

  if (!moduleWithLessons) return null;

  // convert to plain object to safely return as JSON
  return moduleWithLessons.get({ plain: true });
};


export const GetSingleLesson = async (lessonId) => {
  if (!lessonId) return null;

  const lesson = await Lesson.findByPk(lessonId, {
    attributes: ["id", "title", "description", "isMandatory", "sequence", "createdAt", "updatedAt"],
    include: [
      {
        model: LessonExample,
        as: "examples", // must match association alias
        attributes: ["id", "codeSnippet", "description"],
        order: [["createdAt", "ASC"]]
      },
      {
        model: LessonLearningPoint,
        as: "learningPoints", // must match alias
        attributes: ["id", "point"],
        order: [["id", "ASC"]]
      },
      {
        model: LessonResource,
        as: "resources", // must match alias
        attributes: ["id", "type", "url"],
        order: [["id", "ASC"]]
      }
    ]
  });

  if (!lesson) return null;

  // convert to plain object to safely return JSON
  return lesson.get({ plain: true });
};

export const DeleteLesson = async (lessonId) => {
  // Start a new transaction
  const transaction = await sequelize.transaction();

  try {
    // 1️⃣ Check if lesson exists
    const lesson = await Lesson.findOne({
      where: { id: lessonId },
      include: [
        { model: LessonResource, as: "resources" },
        { model: LessonLearningPoint, as: "learningPoints" },
        { model: LessonExample, as: "examples" },
      ],
      transaction,
    });

    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonId} not found`);
    }

    // 2️⃣ Delete related records manually
    await LessonResource.destroy({ where: { lessonId }, transaction });
    await LessonLearningPoint.destroy({ where: { lessonId }, transaction });
    await LessonExample.destroy({ where: { lessonId }, transaction });

    // 3️⃣ Delete the lesson itself
    await Lesson.destroy({ where: { id: lessonId }, transaction });

    // 4️⃣ Commit the transaction
    await transaction.commit();

    // 5️⃣ Return deleted lesson info (before deletion)
    return {
      message: `Lesson '${lesson.title}' and its related data were deleted successfully.`,
      deletedLesson: lesson.get({ plain: true }),
    };
  } catch (error) {
    // ❌ Rollback if transaction still open
    if (!transaction.finished) {
      await transaction.rollback();
    }
    throw new Error(`Lesson deletion failed: ${error.message}`);
  }
};

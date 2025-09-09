import { CareerDomain, Module, Lesson, QuizQuestion, UserModuleProgress, UserLessonProgress, UserQuizAnswer } from "../models/index.js";
import UserCareerDomain from "../models/skilltracking/userCareerDomain.js";

// Enroll user in a new career domain (multi-domain support, auto-enroll modules/lessons/quizzes)
export const enrollCareerDomain = async (req, res) => {
  try {
    const { careerDomainId } = req.body;
    const userId = req.userId;
    if (!careerDomainId)
      return res.status(400).json({ success: false, message: "careerDomainId required" });

    const domain = await CareerDomain.findByPk(careerDomainId);
    if (!domain)
      return res.status(404).json({ success: false, message: "Career domain not found" });

    // Check if already enrolled
    let userDomain = await UserCareerDomain.findOne({
      where: { userId, careerDomainId },
    });
    if (userDomain) {
      return res.status(200).json({
        success: false,
        message: "User already enrolled in this domain",
      });
    }

    // Enroll user in career domain
    userDomain = await UserCareerDomain.create({ userId, careerDomainId });

    // Get modules via DomainModuleMapping
    const modules = await domain.getModules(); // uses the many-to-many relation
    for (const module of modules) {
      // UserModuleProgress
      await UserModuleProgress.findOrCreate({
        where: { userId, moduleId: module.id },
        defaults: { userId, moduleId: module.id },
      });

      const lessons = await module.getLessons(); // fetch lessons of this module
      for (const lesson of lessons) {
        await UserLessonProgress.findOrCreate({
          where: { userId, lessonId: lesson.id },
          defaults: { userId, lessonId: lesson.id },
        });

        const quizzes = await lesson.getQuizQuestions(); // fetch quizzes of this lesson
        for (const quiz of quizzes) {
          await UserQuizAnswer.findOrCreate({
            where: { userId, lessonId: lesson.id, quizQuestionId: quiz.id },
            defaults: {
              userId,
              lessonId: lesson.id,
              quizQuestionId: quiz.id,
              selectedOption: null,
              isCorrect: null,
            },
          });
        }
      }
    }

    res.json({ success: true, userCareerDomain: userDomain });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


// Get all career domains the user is enrolled in (array)
export const getCurrentCareerDomain = async (req, res) => {
  try {
    const userId = req.userId;
    const userDomains = await UserCareerDomain.findAll({
      where: { userId },
      include: [{ model: CareerDomain }],
    });
    if (!userDomains || userDomains.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User is not enrolled in any career domain",
      });
    }
    const careerDomains = userDomains.map((ud) => ud.careerDomain);
    res.json({ success: true, careerDomains });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getAllCareerDomains = async (req, res) => {
  try {
    const careerDomains = await CareerDomain.findAll();
    return res.status(200).json({ success: true, careerDomains });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

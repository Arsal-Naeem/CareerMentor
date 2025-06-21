import AssessmentOption from "../models/AssessmentOptionModel.js";
import AssessmentQuestion from "../models/assestmentQuestionModel.js";
import AssessmentSession from "../models/assestmentSession.js";
import { getSubcategoriesByCategory } from "../utils/getSubcategoriesFromDB.js";
import { pickTwoBalancedQuestions } from "../utils/twoQuestion.js";

// Helper to format a question with options
const formatQuestion = (question) => ({
  id: question.id,
  questionText: question.questionText,
  bloomLevel: question.bloomLevel,
  bloomWeight: question.bloomWeight,
  subcategory: question.subcategory,
  options:
    question.options?.map((opt) => ({
      id: opt.id,
      optionText: opt.optionText,
      score: opt.score,
    })) || [],
});

// Create Assessment Session
export const createAssessmentSession = async (req, res) => {
  try {
    const userId = req.userId;
    const { category } = req.body;

    const subcategories = await getSubcategoriesByCategory(category);
    if (!subcategories?.length) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No subcategories found for category.",
        });
    }

    const selectedQuestions = [];
    for (const subcat of subcategories) {
      const twoQs = await pickTwoBalancedQuestions(subcat);
      selectedQuestions.push(...twoQs);
    }

    const questionIds = selectedQuestions.map((q) => q.id);
    const session = await AssessmentSession.create({
      userId,
      category,
      subcategory: subcategories.join(","),
      questionIds,
      currentIndex: 0,
      answers: {},
    });

    const formattedQuestions = selectedQuestions.map(formatQuestion);

    return res.status(200).json({
      success: true,
      sessionId: session.sessionId,
      questions: formattedQuestions,
    });
  } catch (err) {
    console.error("Start Assessment Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Unable to start assessment" });
  }
};

// Get Current Question from Assessment Session
export const getAssessmentSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await AssessmentSession.findByPk(sessionId);
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    const { questionIds, currentIndex } = session;
    if (currentIndex >= questionIds.length) {
      return res
        .status(200)
        .json({
          success: true,
          isFinished: true,
          message: "Assessment already completed.",
        });
    }

    const question = await AssessmentQuestion.findByPk(
      questionIds[currentIndex],
      {
        include: [{ model: AssessmentOption, as: "options" }],
      }
    );

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    return res.status(200).json({
      success: true,
      currentIndex,
      totalQuestions: questionIds.length,
      isFinished: false,
      question: formatQuestion(question),
    });
  } catch (err) {
    console.error("Get Assessment Session Error:", err);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve assessment session",
      });
  }
};

// Submit Answer
export const submitAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { selectedOptionId } = req.body;

    const session = await AssessmentSession.findByPk(sessionId);
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    const { questionIds, currentIndex, answers } = session;

    if (currentIndex >= questionIds.length) {
      return res
        .status(200)
        .json({
          success: true,
          isFinished: true,
          message: "Assessment already completed.",
        });
    }

    const currentQuestionId = questionIds[currentIndex];

    // 🧠 Validate if selectedOptionId belongs to this question
    const validOption = await AssessmentOption.findOne({
      where: {
        id: selectedOptionId,
        questionId: currentQuestionId,
      },
    });

    if (!validOption) {
      return res.status(400).json({
        success: false,
        message: "Invalid option selected for the current question.",
      });
    }

    // Save answer
    session.answers = { ...answers, [currentQuestionId]: selectedOptionId };
    session.currentIndex += 1;
    await session.save();

    return res.status(200).json({
      success: true,
      message: "Answer submitted successfully",
      nextQuestionIndex: session.currentIndex,
      isFinished: session.currentIndex >= questionIds.length,
    });
  } catch (err) {
    console.error("Submit Answer Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to submit answer" });
  }
};

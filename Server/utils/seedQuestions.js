import { sequelize } from "../config/connectDB.js";
import AssessmentOption from "../models/AssessmentOptionModel.js";
import AssessmentQuestion from "../models/assestmentQuestionModel.js";
import questionsData from "../data/management_planning_questions_part1.json" with { type: "json" };

export const insertQuestions = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    for (const question of questionsData) {
      // Insert the question first
      const createdQuestion = await AssessmentQuestion.create({
        category: question.category,
        subcategory: question.subcategory,
        questionText: question.questionText,
        bloomLevel: question.bloomLevel.toLowerCase(), // just in case it's uppercase like "Apply"
        bloomWeight: question.bloomWeight,
      });

      // Insert related options
      const optionsWithQuestionId = question.options.map((option) => ({
        optionText: option.optionText || option.text, // handles both "optionText" and "text"
        score: option.score,
        questionId: createdQuestion.id,
      }));

      await AssessmentOption.bulkCreate(optionsWithQuestionId);
      console.log(`✅ Inserted question: ${question.questionText}`);
    }

    console.log("🎉 All questions inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1);
  }
};


// scripts/seedQuestions.js
import path from "path";
import { sequelize } from "../config/connectDB.js";
import AssessmentQuestion from "../models/assestmentQuestionModel.js";
import fs from "fs";

// Load questions from JSON file
const questionsFilePath = path.resolve("data", "management_planning_questions_part1.json"); // adjust path as needed
const rawData = fs.readFileSync(questionsFilePath);
const questions = JSON.parse(rawData);

export const seedQuestions = async () => {
  try {
    await sequelize.sync(); // ensure DB connection

    for (const question of questions) {
      await AssessmentQuestion.create(question);
    }

    console.log("✅ Seeded all assessment questions.");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding questions:", error);
    process.exit(1);
  }
};



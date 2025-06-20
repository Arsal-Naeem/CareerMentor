import { AssessmentOption, AssessmentQuestion } from "../models/index.js";

export const pickTwoBalancedQuestions = async (subcategory) => {
  const questions = await AssessmentQuestion.findAll({
    where: { subcategory },
    include: [{ model: AssessmentOption, as: "options" }],
  });

  const group = {};
  questions.forEach(q => {
    if (!group[q.bloomLevel]) group[q.bloomLevel] = [];
    group[q.bloomLevel].push(q);
  });

  const highLevels = ["create", "evaluate", "analyze"];
  const lowLevels = ["apply", "understand", "remember"];

  let high = null, low = null;

  for (let level of highLevels) {
    if (group[level]?.length) {
      high = group[level][Math.floor(Math.random() * group[level].length)];
      break;
    }
  }

  for (let level of lowLevels) {
    if (group[level]?.length) {
      low = group[level][Math.floor(Math.random() * group[level].length)];
      break;
    }
  }

  if (high && low && high.id !== low.id) {
    return [high, low];
  }

  // Fallback if only 1 type exists
  return questions.sort(() => 0.5 - Math.random()).slice(0, 2);
};

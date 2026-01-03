import genAI from "./openaiClient.js";

export const getQuestionQuiz = async (quizData) => {
  console.log("Generating quiz questions for lessons:", quizData);

  if (!quizData?.lessons?.length) return [];

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Updated prompt: ask AI to provide correct answers
  const prompt =
    `You are an expert quiz generator AI specializing in creating quizzes for assessing skills in software and computer science fields. 
Generate at least 10 questions (with 4 options each) from the following lesson titles:\n\n` +
    quizData.lessons
      .map((lesson, index) => `${index + 1}. ${lesson.title}`)
      .join("\n") +
    `

Additionally, add 3 extra questions that are the hardest possible questions related to these lessons. These should challenge the user’s knowledge at a higher level. Make sure they are randomly different from the first 10 questions and all are scenario-based.

Format the output exactly like this, and include the correct answer for each question at the end:

Question 1: <question text>
A) <option A>
B) <option B>
C) <option C>
D) <option D>
Correct Answer: <A/B/C/D>

Question 2: <question text>
A) <option A>
B) <option B>
C) <option C>
D) <option D>
Correct Answer: <A/B/C/D>

...`

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const outputText = await response.text();

    console.log("Quiz questions generated:", outputText);

    // Parse the text into structured objects
    const questions = [];
    const questionBlocks = outputText.split(/Question \d+:/).filter(Boolean);

    questionBlocks.forEach((block) => {
      const lines = block.trim().split("\n").map((l) => l.trim());
      if (lines.length < 6) return; // skip incomplete blocks

      const questionText = lines[0];
      const options = {
        A: lines[1].replace(/^A\)\s*/, ""),
        B: lines[2].replace(/^B\)\s*/, ""),
        C: lines[3].replace(/^C\)\s*/, ""),
        D: lines[4].replace(/^D\)\s*/, ""),
      };

      // Extract correct answer
      const correctAnswerLine = lines.find((l) => l.toLowerCase().startsWith("correct answer"));
      const correctAnswer = correctAnswerLine
        ? correctAnswerLine.split(":")[1].trim().toUpperCase()
        : null;

      questions.push({ questionText, options, correctAnswer });
    });

    return questions;
  } catch (err) {
    console.error("Error generating quiz questions:", err);
    return [];
  }
};

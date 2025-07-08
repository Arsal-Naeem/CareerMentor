import openai from "./openaiClient.js";

export const getCareerRecommendation = async (userData) => {
  const prompt = `
You are a career guidance AI of software and computer science field.

The user answered several questions in three categories:
- Cognitive and Analytical Thinking
- Creative and Adaptive Thinking
- Self-Awareness and Career Preference

Each answer reflects their thinking style and preferences.

Task:
1. Identify their strengths.
2. Recommend 3 suitable software-related careers from this list:
   - Frontend Developer
   - Backend Developer
   - Full Stack Developer
   - Data Analyst
   - ML Engineer
   - Cloud Engineer
   - DevOps Engineer
   - UI/UX Designer
   - Game Developer

✅ Respond **only** in **valid JSON format**, no explanations, no markdown, no extra text.
The structure should be:
{
  "recommendations": [
    { "career": "Career Name", "reason": "Short reason..." },
    ...
  ]
}

Data:
${JSON.stringify(userData, null, 2)}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a career counselor AI assistant." },
      { role: "user", content: prompt },
    ],
  });

  let content = response.choices[0].message.content.trim();

  // 🔧 Clean up GPT response (remove ```json or ``` if present)
  if (content.startsWith("```")) {
    content = content.replace(/^```json\s*|^```\s*|```$/g, "").trim();
  }

  // 🔁 Retry logic to safely parse JSON
  let parsed = null;
  let attempts = 0;

  while (attempts < 3 && !parsed) {
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      attempts++;
      console.warn(`❌ Attempt ${attempts} - Failed to parse GPT response JSON.`);
      if (attempts === 3) {
        console.error("❌ Final GPT output:\n", content);
        throw new Error("Invalid JSON format from GPT");
      }
    }
  }

  return parsed;
};


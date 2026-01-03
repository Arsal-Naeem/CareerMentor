import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  postQuizSession,
  getQuizSessions,
  startQuizSession,
  submitQuizAnswer
} from "../controllers/quiz/quizController.js";

const router = express.Router();

router.post("/start-quiz/:moduleId", verifyToken, postQuizSession);

router.get("/all-quiz/:moduleId", verifyToken, getQuizSessions);

router.get("/quiz-questions/:quizSessionId", verifyToken, startQuizSession);

router.patch("/submit-quiz/:quizSessionId", verifyToken, submitQuizAnswer);

export default router;

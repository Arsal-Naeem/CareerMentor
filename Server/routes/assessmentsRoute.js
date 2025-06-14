import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createAssessmentSession, getAssessmentSession, submitAnswer } from "../controllers/assessmentQuestionsController.js";
const router = express.Router();

router.post("/session", verifyToken, createAssessmentSession);
router.get("/session/:sessionId", verifyToken, getAssessmentSession);
router.post("/session/:sessionId/answer", verifyToken, submitAnswer);


export default router;

import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createAssessmentSession,
  getAssessmentSession,
  submitAnswer,
} from "../controllers/assessmentQuestionsController.js";

const router = express.Router();

/**
 * @swagger
 * /api/assessment/session:
 *   post:
 *     summary: Start a new assessment session
 *     tags: [Assessment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: critical-thinking
 *     responses:
 *       200:
 *         description: Assessment session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 sessionId:
 *                   type: string
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: No subcategories found
 *       500:
 *         description: Server error
 */
router.post("/session", verifyToken, createAssessmentSession);

/**
 * @swagger
 * /api/assessment/session/{sessionId}:
 *   get:
 *     summary: Get current question in assessment session
 *     tags: [Assessment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the assessment session
 *     responses:
 *       200:
 *         description: Returns current question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 currentIndex:
 *                   type: number
 *                 totalQuestions:
 *                   type: number
 *                 isFinished:
 *                   type: boolean
 *                 question:
 *                   type: object
 *       404:
 *         description: Session or question not found
 *       500:
 *         description: Server error
 */
router.get("/session/:sessionId", verifyToken, getAssessmentSession);

/**
 * @swagger
 * /api/assessment/session/{sessionId}/answer:
 *   post:
 *     summary: Submit answer to current question
 *     tags: [Assessment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the assessment session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selectedOptionId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Answer submitted successfully
 *       400:
 *         description: Invalid option selected
 *       404:
 *         description: Session not found
 *       500:
 *         description: Server error
 */
router.post("/session/:sessionId/answer", verifyToken, submitAnswer);

export default router;

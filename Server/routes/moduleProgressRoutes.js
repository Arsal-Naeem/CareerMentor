import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  startOrGetModuleProgress,
  getLessonsForModule,
  startOrGetLessonProgress,
  submitQuizAnswer,
  getUserModuleProgress,
  getAllModules,
  getQuizzesForLesson,
  getUserEnrolledModules,
  getUserEnrolledLessonsForModule,
  getUserQuizzesForLessonWithStatus,
} from "../controllers/moduleProgressController.js";

const router = express.Router();

// All routes require authentication
router.get("/module/all", verifyToken, getAllModules);
router.post("/module/start", verifyToken, startOrGetModuleProgress);
router.get("/module/:moduleId/lessons", verifyToken, getLessonsForModule);
router.post("/lesson/start", verifyToken, startOrGetLessonProgress);
router.post("/quiz/answer", verifyToken, submitQuizAnswer);
router.get("/module/:moduleId/progress", verifyToken, getUserModuleProgress);
router.get("/lesson/:lessonId/quizzes", verifyToken, getQuizzesForLesson);

// Get all modules a user is currently enrolled in
router.get("/module/enrolled", verifyToken, getUserEnrolledModules);

// Get all lessons a user is enrolled in for a given module
router.get("/module/:moduleId/enrolled-lessons", verifyToken, getUserEnrolledLessonsForModule);

// Get all quizzes for a lesson, showing which have been attempted and which are pending
router.get("/lesson/:lessonId/user-quizzes", verifyToken, getUserQuizzesForLessonWithStatus);

export default router;

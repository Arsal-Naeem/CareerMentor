import express from "express";
import {
  getAllEventsController,
  getEventDetailsController,
  postEventEnrollmentController,
  cancelEventEnrollmentController,
} from "../controllers/event/eventController.js";
import { checkTokenOptional, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllEventsController);
router.get("/details/:id", checkTokenOptional, getEventDetailsController);

router.post("/enrollment/:eventId", verifyToken, postEventEnrollmentController);

router.patch(
  "/enrollment/cancel/:eventId",
  verifyToken,
  cancelEventEnrollmentController
);

export default router;

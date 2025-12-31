import express from "express";
import { isAdmin, verifyToken } from "../../../middleware/verifyToken.js";
import { upload } from "../../../utils/S3.js";
import {
  postEventController,
  getEventController,
  updateEventController,
  getEnrolledUsersController,
  updateEventStatusController,
} from "../../../controllers/admin/events/eventControllerAdmin.js";

const router = express.Router();

// Create event
router.post(
  "/create-event",
  verifyToken,
  isAdmin,
  upload.single("coverImage"),
  postEventController
);

// Get all events
router.get("/all-events", verifyToken, isAdmin, getEventController);

// Update event details
router.patch("/update-event/:eventId", verifyToken, isAdmin, upload.single("coverImage"), updateEventController);

// Get enrolled users for an event
router.get("/enrolled-users/:eventId", verifyToken, isAdmin, getEnrolledUsersController);

// Update event status (affects all enrolled users)
router.patch("/update-event-status/:eventId", verifyToken, isAdmin, updateEventStatusController);

export default router;

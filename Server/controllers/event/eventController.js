import {
  errorResponse,
  successResponse,
} from "../../utils/handlers/reponseHandler.js";
import {
  getUserEventsService,
  getEventDetailsService,
  postEventEnrollmentService,
  cancelEventEnrollmentService,
} from "./eventServices.js";

// GET /events?search=&page=&limit=
export const getAllEventsController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const data = await getUserEventsService({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    return successResponse(res, data, "Events fetched successfully");
  } catch (error) {
    console.error("Error fetching events:", error);
    return errorResponse(res, error.message || "Unable to fetch events", 500);
  }
};

// GET /events/details/:id
export const getEventDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId || null; // optional for public access

    if (!id) {
      return errorResponse(res, "Event ID is required", 400);
    }

    const event = await getEventDetailsService({ eventId: id, userId });

    if (!event) {
      return successResponse(res, null, "No event found", 200);
    }

    return successResponse(res, event, "Event details fetched successfully");
  } catch (error) {
    console.error("Error fetching event details:", error);
    return errorResponse(
      res,
      error.message || "Unable to fetch event details",
      500
    );
  }
};

// POST /events/enrollment/:eventId
export const postEventEnrollmentController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    if (!eventId) {
      return errorResponse(res, "Event ID is required", 400);
    }

    const result = await postEventEnrollmentService({ eventId, userId });

    return successResponse(res, result, "Enrollment successful", 201);
  } catch (error) {
    return errorResponse(res, error.message || "Unable to enroll", 500);
  }
};

// PATCH /events/enrollment/cancel/:eventId
export const cancelEventEnrollmentController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    if (!eventId) {
      return errorResponse(res, "Event ID is required", 400);
    }

    const result = await cancelEventEnrollmentService({ eventId, userId });

    return successResponse(res, result, "Enrollment cancelled successfully");
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Unable to cancel enrollment",
      500
    );
  }
};

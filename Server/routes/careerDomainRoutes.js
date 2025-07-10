import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { enrollCareerDomain, getCurrentCareerDomain } from "../controllers/careerDomainController.js";

const router = express.Router();

router.post("/enroll", verifyToken, enrollCareerDomain);

// Get the current career domain for the user
router.get("/current", verifyToken, getCurrentCareerDomain);

export default router;

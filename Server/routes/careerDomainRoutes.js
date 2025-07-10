import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { enrollCareerDomain } from "../controllers/careerDomainController.js";

const router = express.Router();

router.post("/enroll", verifyToken, enrollCareerDomain);

export default router;

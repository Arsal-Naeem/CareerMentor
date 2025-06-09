import express from 'express';
import { forgotPasswordController, loginController, logoutController, resetPasswordController, signUpController, verifyEmailController,checkAuth } from '../controllers/authController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/checkauth", verifyToken, checkAuth)

router.post("/signup", signUpController)
router.post("/login", loginController)
router.post("/logout", logoutController)

router.post("/verify-email", verifyEmailController)
router.post("/forgot-password", forgotPasswordController)

router.post("/reset-password/:token", resetPasswordController)


export default router;
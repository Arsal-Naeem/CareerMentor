import express from 'express';
import { forgotPasswordController, loginController, logoutController, resetPasswordController, signUpController, verifyEmailController,checkAuth, resendVerificationEmailController } from '../controllers/authController.js';
import { isAdmin, verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/checkauth", verifyToken, checkAuth)

router.post("/signup", signUpController)
router.post("/login", loginController)
router.post("/logout", logoutController)

router.post("/verify-email", verifyEmailController)
router.post("/forgot-password", forgotPasswordController)
router.post("/send-verification-token", resendVerificationEmailController)

router.post("/reset-password/:token", resetPasswordController)

router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ success: true, message: "You are an admin" });
});


export default router;
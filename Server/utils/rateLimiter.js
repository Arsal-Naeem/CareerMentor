import rateLimit from "express-rate-limit";

export const resendOtpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3, // limit to 3 requests per minute per IP
  message: "Too many OTP requests from this IP, please try again later.",
});
import { lazy } from "react";

export const Login = lazy(() => import("@/pages/auth/Login"));
export const Signup = lazy(() => import("@/pages/auth/Signup"));
export const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
export const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
export const Otp = lazy(() => import("@/pages/auth/Otp"));
export const ResendOtp = lazy(() => import("@/pages/auth/ResendOtp"));

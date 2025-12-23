import { PublicRoute } from "@/components/protectedRoute/protectedRoutes";
import { AUTH_ROUTES } from "@/constants/navigation";
import { Outlet } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  Otp,
  ResendOtp,
  ResetPassword,
  Signup,
} from "./import/AuthRoutes";

export const authRouter = [
  {
    path: AUTH_ROUTES.INDEX,
    element: (
      <PublicRoute>
        <Outlet />
      </PublicRoute>
    ),
    children: [
      {
        index: true,
        element: <Login />,
        path: AUTH_ROUTES.LOGIN,
      },
      {
        path: AUTH_ROUTES.SIGNUP,
        element: <Signup />,
      },
      {
        path: AUTH_ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: AUTH_ROUTES.RESET_PASSWORD,
        element: <ResetPassword />,
      },
      {
        path: AUTH_ROUTES.VERIFY_IDENTITY,
        element: <Otp />,
      },
      {
        path: AUTH_ROUTES.RESEND_OTP,
        element: <ResendOtp />,
      },
    ],
  },
];

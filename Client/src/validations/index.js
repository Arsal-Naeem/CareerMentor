import { EmailSchema, PasswordSchema } from "./commonValidators";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const SignupFormSchema = yupResolver(
  yup.object({
    firstName: yup.string().required("First name is required."),
    lastName: yup.string().required("Last name is required."),
    dateOfBirth: yup.date().nullable().required("Date of Birth is required."),
    email: EmailSchema,
    password: PasswordSchema(),
    confirmPassword: PasswordSchema("password", "Confirm Password"),
  })
);

export const LoginFormSchema = yupResolver(
  yup.object({
    email: EmailSchema,
    password: PasswordSchema(),
  })
);

export const OtpSchema = yupResolver(
  yup.object({
    otp: yup
      .string()
      .required("OTP is required")
      .length(6, "OTP must be 6 digits"),
  })
);

export const ResendOtpFormSchema = yupResolver(
  yup.object({
    email: EmailSchema,
  })
);

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  DateSchema,
  EmailSchema,
  FirstNameValidation,
  ImagePreviewSchema,
  ImageSchemaWithPreview,
  LastNameValidation,
  PasswordSchema,
  StringRequiredSchema,
  TagsSchema,
  UrlSchema,
} from "./commonValidators";

export const SignupFormSchema = yupResolver(
  yup.object({
    firstName: FirstNameValidation,
    lastName: LastNameValidation,
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

export const EventFormSchema = yupResolver(
  yup.object({
    name: StringRequiredSchema("Event Name"),
    shortDesc: StringRequiredSchema("Short Description"),
    description: yup.mixed().nullable().required("Description is required"),
    date: DateSchema("Event Date"),
    venue: StringRequiredSchema("Venue"),
    startTime: yup.string().required("Start time is required"),
    endTime: yup
      .string()
      .required("End time is required")
      .test(
        "time-comparison",
        "End time must be greater than start time",
        function (endTime) {
          const { startTime } = this.parent;

          if (!startTime || !endTime) return true;

          if (startTime === endTime) {
            return this.createError({
              message: "Start time and end time cannot be the same",
            });
          }

          if (endTime < startTime) {
            return this.createError({
              message: "End time must be later than start time",
            });
          }

          return true;
        }
      ),
    registrationLink: yup
      .string()
      .url("Enter a valid URL")
      .nullable()
      .optional(),
    registrationType: yup.string().oneOf(["internal", "external"]).optional(),
    tags: yup.array().of(yup.string()).optional(),
    // status: yup.string().oneOf(["pending", "approved", "rejected"]).optional(),
  })
);

export const EditProfileSchema = yupResolver(
  yup.object({
    firstName: FirstNameValidation,
    lastName: LastNameValidation,
  })
);

export const ChangePasswordSchema = yupResolver(
  yup.object({
    currentPassword: PasswordSchema("", "Current Password"),
    newPassword: PasswordSchema("", "New Password"),
    confirmNewPassword: PasswordSchema("newPassword", "Confirm Password"),
  })
);

export const BlogFormSchema = yup.object({
  title: StringRequiredSchema("Blog Title"),

  shortDesc: StringRequiredSchema("Short Description"),

  coverImage: ImageSchemaWithPreview(),

  coverImagePreview: ImagePreviewSchema,

  description: yup.mixed().required("Description is required"),

  tags: TagsSchema(),

  timeToRead: yup.string().optional(),
});

export const CareerFormSchema = BlogFormSchema.pick([
  "coverImage",
  "coverImagePreview",
  "description",
]).shape({
  name: StringRequiredSchema("Career Name"),
});

export const ProjectFormSchema = BlogFormSchema.pick([
  "coverImage",
  "coverImagePreview",
]).shape({
  projectName: StringRequiredSchema("Project Name"),
  description: StringRequiredSchema("Project Description"),
  techStack: TagsSchema("Tech Stack"),
  url: UrlSchema(),
});

export const CertificationFormSchema = yup.object({
  name: StringRequiredSchema("Certification Name"),
  organization: StringRequiredSchema("Issuing Organization"),
  description: yup.string().optional(),
  issueDate: DateSchema("Issue Date"),
  certificateImage: ImageSchemaWithPreview(
    "certificationImagePreview",
    "Certificate Image"
  ),
  certificationImagePreview: ImagePreviewSchema,
  credentialUrl: UrlSchema("Credential URL"),
});

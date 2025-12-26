import { acceptedImageTypes } from "@/constants";
import * as yup from "yup";

const EMAIL_REGEX =
  /^(?=.{6,320}$)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const SPACES = /^\S*$/;

export const FirstNameValidation = yup
  .string()
  .required("First name is required.");

export const LastNameValidation = yup
  .string()
  .required("Last name is required.");

export const EmailSchema = yup
  .string()
  .required("Email is required")
  .matches(EMAIL_REGEX, "Please enter valid email address.");

export const PasswordSchema = (ref = "", name = "Password") => {
  let validation = yup
    .string()
    .required(`${name} is required.`)
    .matches(SPACES, "Password cannot contain spaces.")
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password cannot exceed 128 characters.");

  if (ref) {
    validation = validation.test(
      "not-same-as-ref",
      "Password's don't match.",
      function (value) {
        const refValue = this.parent?.[ref];
        if (!value || !refValue) return true;
        return value === refValue;
      }
    );
  }
  return validation;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ImageSchemaWithPreview = (
  previewKey = "coverImagePreview",
  imageKey = "Image"
) =>
  yup
    .mixed()
    .nullable()
    .test("image-required", `${imageKey} is required`, function (file) {
      if (this.parent[previewKey]) return true;
      if (!file) return false;
      return true;
    })
    .test(
      "file-type",
      `${imageKey} must be a JPG, PNG, GIF, or WEBP`,
      (file) => {
        if (!file) return true;
        return acceptedImageTypes.includes(file.type);
      }
    )
    .test("file-size", `${imageKey} must be less than 10MB`, (file) => {
      if (!file) return true;
      return file.size <= MAX_FILE_SIZE;
    });

export const ImagePreviewSchema = yup.string().nullable();

export const TagsSchema = (messageKey = "Tags") => {
  return yup
    .array()
    .of(yup.string())
    .min(1, `Please enter atleast 1 ${messageKey.toLowerCase()}`)
    .required(`${messageKey} is required.`);
};

export const StringRequiredSchema = (fieldName = "") => {
  return yup.string().trim().required(`${fieldName} is required.`);
};

export const UrlSchema = (fieldName = "Project URL") => {
  return yup
    .string()
    .url("Enter a valid URL")
    .required(`${fieldName} is required.`);
};

export const DateSchema = (fieldName = "Date") => {
  return yup.date().nullable().required(`${fieldName} is required.`);
};

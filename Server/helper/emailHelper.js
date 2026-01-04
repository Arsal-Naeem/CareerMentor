import { transporter, sender } from "../email/emailConfig.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  welcomeEmailTemplate,
} from "../email/emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Verification Email",
    });
    console.log("Email send successfully", response);
  } catch (error) {
    console.log("Somethig went wrong", error);
  }
};

export const sendWelcomeEmail = async (email, firstName) => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Welcome to Tech Path AI!",
      html: welcomeEmailTemplate.replace("{firstName}", firstName),
      category: "Welcome Email",
    });
    console.log("Email send successfully", response);
  } catch (error) {
    console.log("Somethig went wrong", error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Password Reset Request",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset Email",
    });
    console.log("Email send successfully", response);
  } catch (error) {
    console.log("Somethig went wrong", error);
    res.status(500).send({
      success: false,
      message: "Error in sending email",
      error,
    });
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Password Reset Success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Success Email",
    });
    console.log("Email send successfully", response);
  } catch (error) {
    console.log("Somethig went wrong", error);
    res.status(500).send({
      success: false,
      message: "Error in sending email",
      error,
    });
  }
};

export const validations = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  },
  currentPassword: {
    required: "Current password is required",
    minLength: {
      value: 8,
      message: "Current password must be at least 8 characters",
    },
  },
  newPassword: {
    required: "New password is required",
    minLength: {
      value: 8,
      message: "New password must be at least 8 characters",
    },
  },
  confirmNewPassword: {
    required: "Please confirm your new password",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  },
};

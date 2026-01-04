import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import { useAuth } from "@/context/AuthContext";
import axiosReq from "@/services/axiosHelper";
import { saveItemToStorage } from "@/utils/helpers/storage/localStorage";
import { useMutation } from "@tanstack/react-query";

export const SignupMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosReq(API_MODES.POST, API_ROUTES.AUTH.SIGNUP, data);
      return res.data;
    },
  });
};

export const LoginMutation = () => {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await axiosReq(API_MODES.POST, API_ROUTES.AUTH.LOGIN, {
        email,
        password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      saveItemToStorage("user", data.user);
    },
  });
};

export const VerifyOtpMutation = (options = {}) => {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosReq(
        API_MODES.POST,
        API_ROUTES.AUTH.VERIFY_EMAIL,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      saveItemToStorage("user", data.user);
    },
    ...options,
  });
};

export const ForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (email) => {
      const res = await axiosReq(
        API_MODES.POST,
        API_ROUTES.AUTH.FORGOT_PASSWORD,
        {
          email,
        }
      );
      return res.data;
    },
  });
};

export const LogoutMutation = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: async () => {
      const res = await axiosReq(API_MODES.POST, API_ROUTES.AUTH.LOGOUT);
      return res.data;
    },
    onSuccess,
    onError,
  });
};

export const ResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async ({ password, token }) => {
      const res = await axiosReq(
        API_MODES.POST,
        `${API_ROUTES.AUTH.RESET_PASSWORD}/${token}`,
        {
          password,
        }
      );
      return res.data;
    },
  });
};

export const ResendVerificationEmailMutation = () => {
  return useMutation({
    mutationFn: async (email) => {
      const res = await axiosReq(
        API_MODES.POST,
        API_ROUTES.AUTH.RESEND_VERIFICATION,
        {
          email,
        }
      );
      return res.data;
    },
  });
};

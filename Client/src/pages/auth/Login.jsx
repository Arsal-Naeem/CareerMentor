import { useLogin } from "@/apis/auth/auth.service";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AppButton } from "@/components/buttons/AppButton";
import { InputField } from "@/components/InputField/InputField";
import { Message } from "@/components/Message";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { LoginFormSchema } from "@/validations";

const Login = () => {
  usePageTitle("Login");
  const navigate = useNavigate();
  const { mutate: login, isPending, isError, error, isSuccess } = useLogin();

  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: LoginFormSchema,
  });

  const onSubmit = (data) => {
    login(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/user/dashboard");
    }
  }, [isSuccess]);

  return (
    <AuthLayout
      mainHeading="Welcome Back! To Career Mentor"
      text="Sign in to access your dashboard, track progress, and explore new opportunities."
      formText="Let’s continue your journey to a smarter career."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 text-custom-black-dark"
        >
          <InputField
            name="email"
            label="Email"
            htmlFor="email"
            placeholder="johndoe@gmail.com"
            control={control}
          />

          <InputField
            name="password"
            htmlFor="password"
            label="Password"
            type="password"
            control={control}
            placeholder="Enter your password"
          />

          {isSuccess && (
            <div className="col-span-2">
              <Message
                variant="success"
                message="Login succesfull! Redirecting to the dashboard."
              />
            </div>
          )}

          {isError && (
            <div className="col-span-2">
              <Message
                message={`${
                  error?.response?.data?.message || "Login failed. Try again."
                }`}
              />
            </div>
          )}

          {/* Forgot password and submit button */}
          <div className="col-span-2 flex flex-col gap-5 justify-end">
            <Link
              to="/auth/forgot-password"
              className="text-sm font-normal self-end"
            >
              forgot password?
            </Link>
            <AppButton
              className="w-28 md:w-40"
              isPending={isPending}
              title="Sign in"
              loadingTitle="Signing in"
            />
          </div>
        </form>

        {/* Link to signup */}
        <AuthFooter
          text="Don't have an account?"
          title="Sign up"
          href="/auth/signup"
        />
      </div>
    </AuthLayout>
  );
};

export default Login;

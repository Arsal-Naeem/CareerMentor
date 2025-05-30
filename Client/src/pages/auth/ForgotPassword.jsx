import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/buttons/BackButton";

export const ForgotPassword = () => {
  usePageTitle("CareerMentor - Forgot Password");
  return (
    <AuthLayout
      mainHeading="Forgot Your Password?"
      text="Enter your registered email address, and we'll send you instructions to reset your password."
      formText="No worries — we’ll help you get back on track."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form className="grid grid-cols-2 gap-5 text-custom-black-dark">
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-light">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              className="rounded-md"
            />
          </div>

          <div className="col-span-2 flex gap-3 justify-end">
            <BackButton />
            <Button
              type="submit"
              className="text-custom-black-dark anonymous-font font-medium text-base text-white rounded-full w-40 py-3 md:py-6 self-end"
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

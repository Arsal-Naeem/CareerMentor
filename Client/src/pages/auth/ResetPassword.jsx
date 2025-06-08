import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/buttons/BackButton";

export const ResetPassword = () => {
  usePageTitle("Reset Password");
  return (
    <AuthLayout
      mainHeading="Create a New Password"
      text="Enter a new password that's strong and easy for you to remember."
      formText="Let’s secure your account."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form className="grid grid-cols-2 gap-5 text-custom-black-dark">
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-light">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              className="rounded-md"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="confirmPassword" className="text-sm font-light">
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="******"
              className="rounded-md"
            />
          </div>
          <div className="col-span-2 flex gap-3 justify-end">
            <BackButton />
            <Button
              type="submit"
              className="text-custom-black-dark anonymous-font font-medium text-base text-white rounded-full w-40 py-3 md:py-6 self-end"
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Signup = () => {
  usePageTitle("Signup");
  return (
    <AuthLayout
      mainHeading="Join Career Mentor Today"
      text="Discover your ideal tech career — powered by AI, tailored to you."
      formText="It's free and only takes a minute to get started."
    >
      <div className="flex flex-col justify-between h-full">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5 text-custom-black-dark">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-light">
              First Name
            </Label>
            <Input
              id="firstname"
              type="text"
              placeholder="John"
              className="rounded-md"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastname" className="text-sm font-light">
              Last Name
            </Label>
            <Input
              id="lastname"
              type="text"
              placeholder="Doe"
              className="rounded-md"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dob" className="text-sm font-light">
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="text"
              placeholder="12/04/2002"
              className="rounded-md"
            />
          </div>

          <div className="grid gap-2">
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

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm font-light">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              className="rounded-md"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword" className="text-sm font-light">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="******"
              className="rounded-md"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              className="text-custom-black-dark anonymous-font font-medium text-base text-white rounded-full"
            >
              Create Account
            </Button>
          </div>
        </form>
        <div className="flex justify-center place-items-end mt-5 mb-4">
          <p className="text-sm font-normal flex items-center">
            Already have an account?&nbsp;
            <Link
              to="/auth/login"
              className="text-custom-light-blue font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

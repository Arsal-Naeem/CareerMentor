import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInitials } from "@/utils/helpers";
import { validations } from "@/validations/auth/validations";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EyeButton } from "../buttons/EyeButton";
import { OutlinedActionButton } from "../buttons/OutlinedActionButton";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { DatePicker } from "../inputs/DatePicker";
import { Message } from "../Message";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { tabs } from "./constants";

export const SettingsHeader = () => {
  return (
    <div className="text-custom-black space-y-2">
      <h1 className="font-bold text-2xl">Profile Management</h1>
      <h2 className="font-normal text-base">
        Manage you profile information and settings
      </h2>
    </div>
  );
};

export const SettingsTabs = ({ user, isAdmin, isUser }) => {
  return (
    <Tabs defaultValue="profile" className="bg-transparent">
      <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-gray-50 p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            value={tab.value}
            key={tab.value}
            className="flex gap-2 items-center justify-center whitespace-nowrap h-9 px-4 pb-3 pt-2 text-sm font-semibold rounded-none border-b-2 border-b-transparent text-muted-foreground bg-transparent transition-none shadow-none data-[state=active]:border-b-custom-text-orange data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-custom-text-orange"
          >
            {tab.icon}
            <p>{tab.label}</p>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="profile" className="mt-7">
        <Profile user={user} isAdmin={isAdmin} isUser={isUser} />
      </TabsContent>
      <TabsContent value="change-password" className="mt-7">
        <ChangePassword />
      </TabsContent>
    </Tabs>
  );
};

const Profile = ({ user, isAdmin, isUser }) => {
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);

  const handleToggleEditProfile = () => {
    setIsEditProfileVisible((prev) => !prev);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-custom-gray rounded-md p-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full w-24 h-24 bg-gray-100 flex items-center justify-center text-custom-black font-semibold text-2xl">
            {getInitials(user?.firstName, user?.lastName) || "RN"}
          </div>
          <div className="space-y-1 text-custom-black">
            <h3 className="font-semibold text-xl">
              {user?.firstName
                ? user?.lastName && `${user.firstName} ${user.lastName}`
                : "Rumaisa Naveed"}
            </h3>
            <p className="text-base font-light">
              {user?.email ?? "rumaisa@gmail.com"}
            </p>
          </div>
        </div>
        <Button
          className="bg-custom-text-orange text-white font-light hover:bg-custom-orange self-end md:self-center"
          onClick={handleToggleEditProfile}
        >
          <Edit />
          <p>Edit Profile</p>
        </Button>
      </div>
      {isEditProfileVisible ? (
        <EditProfile
          user={user}
          isAdmin={isAdmin}
          isUser={isUser}
          onCancel={handleToggleEditProfile}
        />
      ) : (
        <ProfileDetails user={user} isAdmin={isAdmin} isUser={isUser} />
      )}
    </div>
  );
};

const ProfileDetails = ({ user, isAdmin, isUser }) => {
  return (
    <div className="bg-white border border-custom-gray rounded-md p-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-2 text-custom-black">
        <p className="font-semibold text-base">First Name</p>
        <p className="font-light text-sm">{user?.firstName ?? "Rumaisa"}</p>
      </div>
      <div className="space-y-2 text-custom-black">
        <p className="font-semibold text-base">Last Name</p>
        <p className="font-light text-sm">{user?.lastName ?? "Naveed"}</p>
      </div>
      <div className="space-y-2 text-custom-black">
        <p className="font-semibold text-base">Date of Birth</p>
        <p className="font-light text-sm">
          {user?.dateOfBirth ?? "24/05/2003"}
        </p>
      </div>
      <div className="space-y-2 text-custom-black">
        <p className="font-semibold text-base">Email</p>
        <p className="font-light text-sm">
          {user?.email ?? "rumaisa@gmail.com"}
        </p>
      </div>
      <div className="space-y-2 text-custom-black">
        <p className="font-semibold text-base">System Role</p>
        <p className="font-light text-sm">
          {isAdmin ? "Admin" : isUser ? "User" : "User"}
        </p>
      </div>
    </div>
  );
};

const EditProfile = ({ user, isAdmin, isUser, onCancel }) => {
  const { reset, setValue, watch, handleSubmit, register } = useForm();

  const dateOfBirth = watch("dateOfBirth");

  useEffect(() => {
    if (user) {
      reset({
        firstName: user?.firstName || "N/A",
        lastName: user?.lastName || "N/A",
        dateOfBirth: user?.dateOfBirth || "N/A",
        email: user?.email || "N/A",
      });
    }
  }, [user, reset]);

  const handleEditProfile = (data) => {
    console.log("Edit Profile Data:", data);
    // api call
    // refetch
    // show toast
    // redirect to view details
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditProfile)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-custom-black-dark bg-white border border-custom-gray rounded-md p-6"
    >
      <div className="grid gap-2 w-full">
        <Label htmlFor="firstName" className="text-sm">
          First Name
        </Label>
        <Input
          id="firstName"
          name="firstName"
          className="w-full"
          type="text"
          placeholder="John"
          {...register("firstName")}
        />
      </div>
      <div className="grid gap-2 w-full">
        <Label htmlFor="lastName" className="text-sm">
          Last Name
        </Label>
        <Input
          name="lastName"
          id="lastName"
          className="w-full"
          type="text"
          placeholder="Doe"
          {...register("lastName")}
        />
      </div>

      <div className="grid gap-2 relative w-full">
        <Label htmlFor="dateOfBirth" className="text-sm">
          Date of Birth
        </Label>
        <DatePicker
          value={dateOfBirth}
          onChange={(date) => setValue("dateOfBirth", date)}
          placeholder="12/04/2003"
          disabled
        />
      </div>

      <div className="grid gap-2 w-full">
        <Label htmlFor="email" className="text-sm">
          Email Address
        </Label>
        <Input
          id="email"
          className="w-full"
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          disabled
        />
      </div>

      <div className="grid gap-2 w-full">
        <Label htmlFor="systemRole" className="text-sm">
          System Role
        </Label>
        <Input
          id="systemRole"
          className="w-full"
          type="text"
          name="systemRole"
          placeholder="System Role"
          value={isAdmin ? "Admin" : isUser ? "User" : "User"}
          disabled
        />
      </div>

      <div className="md:col-span-2 flex justify-end gap-2 mt-4">
        <OutlinedActionButton
          title="Cancel"
          className="bg-white border border-custom-gray px-4 py-2 rounded-md !font-light text-sm text-custom-gray-dark"
          onClick={onCancel}
        />
        <SecondaryButton
          title="Update Profile"
          loadingTitle="Updating..."
          variant="dark"
          className="!bg-custom-text-orange font-light text-white !text-sm !font-poppins rounded-md !hover:bg-custom-orange-light"
        />
      </div>
    </form>
  );
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const newPassword = watch("newPassword");

  const handleChangePassword = (data) => {
    console.log("Change Password Data:", data);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-bold text-2xl">Change Password</h3>
        <h4 className="font-normal text-base">
          Update your password for enhanced security.
        </h4>
      </div>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="bg-white border border-custom-gray rounded-md p-6"
      >
        <div className="grid gap-2 w-full">
          <Label htmlFor="currentPassword" className="text-sm font-normal">
            Current Password
          </Label>
          <div className="relative">
            <Input
              id="currentPassword"
              className="w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current password"
              {...register("currentPassword", validations.currentPassword)}
            />
            <EyeButton
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
          <div className="min-h-[1.25rem] md:min-h-[35px]">
            {errors.currentPassword && (
              <Message message={errors.currentPassword.message} />
            )}
          </div>
        </div>

        <div className="grid gap-2 w-full">
          <Label htmlFor="newPassword" className="text-sm font-normal">
            New Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              className="w-full"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter confirm password"
              {...register("newPassword", {
                ...validations.newPassword,
              })}
            />
            <EyeButton
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
            />
          </div>
          <div className="min-h-[1.25rem] md:min-h-[35px]">
            {errors.newPassword && (
              <Message message={errors.newPassword.message} />
            )}
          </div>
        </div>

        <div className="grid gap-2 w-full">
          <Label htmlFor="confirmNewPassword" className="text-sm font-normal">
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmNewPassword"
              className="w-full"
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Enter confirm password"
              {...register("confirmNewPassword", {
                ...validations.confirmNewPassword,
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            <EyeButton
              showPassword={showConfirmNewPassword}
              setShowPassword={setShowConfirmNewPassword}
            />
          </div>
          <div className="min-h-[1.25rem] md:min-h-[35px]">
            {errors.confirmNewPassword && (
              <Message message={errors.confirmNewPassword.message} />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <SecondaryButton
            title="Update Password"
            loadingTitle="Updating..."
            variant="dark"
            className="!bg-custom-text-orange font-light text-white !text-sm !font-poppins rounded-md !hover:bg-custom-orange-light"
          />
        </div>
      </form>
    </div>
  );
};

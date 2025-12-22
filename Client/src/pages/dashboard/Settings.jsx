import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

const Settings = () => {
  usePageTitle("Settings");
  return <DashboardLayout>Settings page</DashboardLayout>;
};
export default Settings;

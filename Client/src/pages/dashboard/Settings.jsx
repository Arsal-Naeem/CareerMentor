import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

export const Settings = () => {
  usePageTitle("Settings");
  return <DashboardLayout>Settings page</DashboardLayout>;
};

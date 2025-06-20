import { useAuth } from "@/context/AuthContext";
import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

export const Dashboard = () => {
  const {user}= useAuth();
  console.log("User in Dashboard:", user);
  usePageTitle("Dashboard");
  return <DashboardLayout>Dashboard Page</DashboardLayout>;
};

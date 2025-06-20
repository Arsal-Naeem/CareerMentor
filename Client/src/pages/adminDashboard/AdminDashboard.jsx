import { useAuth } from "@/context/AuthContext";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import React from "react";

export const AdminDashboard = () => {
  usePageTitle("Admin Dashboard");
  const { user } = useAuth();
  console.log("Admin Dashboard user:", user);
  return <AdminDashboardLayout>Admin Dashboard</AdminDashboardLayout>;
};

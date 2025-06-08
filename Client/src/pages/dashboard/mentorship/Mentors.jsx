import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

export const Mentors = () => {
  usePageTitle("Mentors");
  return (
    <DashboardLayout>
      <div>Mentors</div>
    </DashboardLayout>
  );
};

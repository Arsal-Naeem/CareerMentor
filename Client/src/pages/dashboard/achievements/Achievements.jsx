import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

export const Achievements = () => {
  usePageTitle("Achievements");
  return (
    <DashboardLayout>
      <div>Achievements</div>
    </DashboardLayout>
  );
};

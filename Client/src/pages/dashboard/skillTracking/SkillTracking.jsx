import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

export const SkillTracking = () => {
  usePageTitle("Skills Tracking");
  return (
    <DashboardLayout>
      <div>SkillTracking</div>
    </DashboardLayout>
  );
};

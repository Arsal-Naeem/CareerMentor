import usePageTitle from "@/hooks/usePageTitle";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

export const Events = () => {
  usePageTitle("Events");
  return <MainLayout>Events Page</MainLayout>;
};

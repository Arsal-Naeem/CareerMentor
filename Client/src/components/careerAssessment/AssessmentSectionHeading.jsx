import { cn } from "@/lib/utils";
import React from "react";

export const AssessmentSectionHeading = ({ heading = "", className = "" }) => {
  return (
    <h1 className={cn("text-black text-3xl lg:text-5xl font-bold", className)}>
      {heading}
    </h1>
  );
};

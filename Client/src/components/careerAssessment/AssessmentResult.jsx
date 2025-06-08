import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect } from "react";
import { AssessmentSectionHeading } from "./AssessmentSectionHeading";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { AssessmentBreadcrumb } from "./AssessmentBreadcrumb";

export const AssessmentResult = () => {
  const { setBreadcrumbSuffix } = useGlobalContext();

  useEffect(() => {
    setBreadcrumbSuffix("Result");
  }, []);

  return (
    <div className="h-full px-6 md:px-10 py-4 md:py-7">
      <div className="flex flex-col gap-3 md:gap-5">
        <AssessmentBreadcrumb />
        <AssessmentSectionHeading
          heading="You’ve completed the Career Assessment!"
          className="max-w-3xl"
        />
        <p className="text-black font-medium text-xl md:text-2xl max-w-4xl">
          Based on your interests, personality, and goals, we’ll suggest top
          career paths tailored for you.
        </p>
        <PrimaryButton title="View My Career Matches" className="w-56" />
      </div>
    </div>
  );
};

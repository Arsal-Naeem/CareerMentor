import { AssessmentBreadcrumb } from "@/components/careerAssessment/AssessmentBreadcrumb";
import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect } from "react";
import { initialAssessmentFeaturesListData } from "@/constants";
import { useGlobalContext } from "@/context/GlobalContext";
import { AssessmentSectionHeading } from "./AssessmentSectionHeading";

export const AssessmentInitialUi = () => {
  const { setBreadcrumbSuffix } = useGlobalContext();

  useEffect(() => {
    setBreadcrumbSuffix();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col 3xl:justify-center 3xl:items-center lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12 px-6 md:px-10 py-4 md:py-7">
        {/* Left Section */}
        <div className="flex flex-col gap-4 max-w-xl">
          <AssessmentBreadcrumb />

          <AssessmentSectionHeading heading="Find Your Fit in Tech" />

          <p className="text-base lg:text-lg font-normal text-custom-black-light">
            This short AI-driven assessment helps you understand where you
            thrive best.
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-3 text-custom-black-dark">
            {initialAssessmentFeaturesListData.map((item, index) => (
              <div className="flex gap-3 items-start" key={index}>
                <img src={item.icon} className="w-5 h-5 mt-1" alt="icon" />
                <div>
                  <p className="font-bold text-base lg:text-lg">{item.title}</p>
                  <p className="text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="bg-custom-orange-light text-white rounded-full px-6 py-3 w-fit mt-2">
            Begin Assessment
          </button>
        </div>

        {/* Right Section - Image Placeholder */}
        <div className="bg-[#D9D9D9] rounded-md h-64 w-full lg:h-96 lg:w-96 mx-auto lg:mx-0" />
      </div>
    </DashboardLayout>
  );
};

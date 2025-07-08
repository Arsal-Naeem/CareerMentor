import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect, useState } from "react";
import { AssessmentSectionHeading } from "./AssessmentSectionHeading";
import { Star } from "lucide-react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";
import { careers, traits } from "@/constants";
import { BreadCrumb } from "./BreadCrumb";
import { OrangeProgressBar } from "../OrangeProgressBar";
import { getCurrentResult } from "@/apis/assessment/assessment.api";
import { getItemFromStorage } from "@/utils/helpers/storage/localStorage";
import { useAssessmentContext } from "@/context/AssessmentContext";

export const AssessmentResult = () => {
  const navigate = useNavigate();
  const { setBreadcrumbText } = useGlobalContext();

  const { step, setStep } = useAssessmentContext();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = getItemFromStorage("sessionId");

  useEffect(() => {
    setBreadcrumbText("Career Assessment/Result");
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      const data = await getCurrentResult(sessionId);
      setResult(data);
    } catch (err) {
      console.error("Failed to fetch results", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewAssessment = () => {
    // Clear related assessment data from localStorage
    localStorage.removeItem("sessionId");
    localStorage.removeItem("categoryNo");
    localStorage.removeItem("step");
    localStorage.removeItem("assessmentAnswers");
    localStorage.removeItem("questions");
    localStorage.removeItem("currentQuestionIndex");

    setStep("start");

    // Navigate to starting route of assessment (adjust if needed)
    navigate("/user/dashboard/career-assessment");
  };

  const handleNavigateToPreviousResults = () => {
    setStep("history");
  };

  if (loading) return <p>Loading your results...</p>;
  if (!result) return <p>No result found.</p>;

  const { badges, recommendedCareers } = result.prediction;

  return (
    <div className="h-full px-6 md:px-10 py-4 md:py-7">
      <div className="flex flex-col 3xl:items-center 3xl:justify-center gap-4 md:gap-6">
        <div className="text-left flex flex-col gap-3">
          <BreadCrumb />
          <h1 className="text-black text-3xl lg:text-5xl font-bold max-w-3xl">
            You’ve completed the Career Assessment!
          </h1>
          <p className="text-black font-medium text-xl md:text-2xl max-w-4xl">
            Based on your interests, personality, and goals, we’ll suggest top
            career paths tailored for you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 xl:gap-20 2xl:gap-24 3xl:gap-28 border border-transparent lg:border-none 3xl:w-[900px]">
          {/* Traits / Badges */}
          <div className="lg:w-2/5 sm:w-1/2 w-full flex flex-col gap-3">
            <h3 className="text-xl font-medium">Your Traits</h3>
            {badges.map((badge, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p className="text-sm font-normal text-black">
                  {badge.categoryName} ({badge.badge})
                </p>
                <OrangeProgressBar value={badge.totalScore} />
              </div>
            ))}
          </div>

          <div className="hidden lg:block w-[2px] bg-gray-300 h-[230px]" />

          {/* Careers */}
          <div className="flex flex-col flex-1 gap-3 3xl:w-full">
            <h3 className="text-xl font-medium">Recommended Careers</h3>
            <div className="flex flex-col gap-2">
              {recommendedCareers.map((career, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Star size={18} />
                    <p className="font-medium text-black text-base">
                      {career.career}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{career.reason}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:mt-4 mt-2">
              <SecondaryButton
                title="Start another assessment"
                className="text-black bg-custom-orange-dark font-normal text-sm w-full sm:w-fit"
                onClickHandler={handleStartNewAssessment}
              />
              <SecondaryButton
                title="View Previous Results"
                className="text-black border border-gray-300 font-normal text-sm w-full sm:w-fit"
                onClickHandler={handleNavigateToPreviousResults}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

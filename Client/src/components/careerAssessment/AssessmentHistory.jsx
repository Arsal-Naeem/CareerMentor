import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPreviousResults } from "@/apis/assessment/assessment.api";
import { BreadCrumb } from "./BreadCrumb";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { Badge } from "../ui/badge";
import { CalendarDays, Star } from "lucide-react";
import { useAssessmentContext } from "@/context/AssessmentContext";

// Optional utility for formatting ISO date strings
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const AssessmentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setStep } = useAssessmentContext();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getPreviousResults();
      setHistory(data.history || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (sessionId) => {
    navigate(`/assessment-result/${sessionId}`);
  };

  const handleBack = () => {
    setStep("result");
    navigate("/user/dashboard/career-assessment");
  };

  if (loading) return <p className="px-6 pt-6">Loading history...</p>;

  return (
    <div className="h-full px-6 md:px-10 py-4 md:py-7">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-black text-3xl font-bold">
          Previous Assessment Results
        </h1>
        <SecondaryButton
          title="Back to Latest Result"
          onClickHandler={handleBack}
          className="text-sm text-black bg-custom-orange-dark"
        />
      </div>

      <BreadCrumb />

      <div className="flex flex-col gap-6 mt-4">
        {history.length === 0 ? (
          <p className="text-gray-600 text-sm">No assessment history found.</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white"
            >
              <div className="flex justify-between flex-wrap gap-4">
                {/* Session Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CalendarDays size={16} />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                  <p className="font-medium text-base text-black">
                    Session ID: {item.sessionId}
                  </p>
                </div>

                <SecondaryButton
                  title="View Details"
                  className="text-sm text-black bg-custom-orange-dark"
                  onClickHandler={() => handleViewDetails(item.sessionId)}
                />
              </div>

              {/* Careers */}
              <div className="mt-4">
                <p className="font-semibold text-sm text-black mb-2">
                  Top Careers:
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.recommendedCareers?.slice(0, 3).map((career, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 text-sm text-gray-700 bg-orange-50 px-3 py-1 rounded-full"
                    >
                      <Star size={14} />
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="mt-4">
                <p className="font-semibold text-sm text-black mb-2">
                  Category Badges:
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.badges?.map((badge, idx) => (
                    <Badge key={idx} variant="outline">
                      {badge.categoryName} - {badge.badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

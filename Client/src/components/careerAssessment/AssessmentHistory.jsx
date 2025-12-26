import { getPreviousResults } from "@/apis/assessment/assessment.api";
import { useAssessmentContext } from "@/context/AssessmentContext";
import { getBadgeColorClasses } from "@/utils/helpers";
import { CalendarDays, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { AssessmentHistorySkeleton } from "../skeletons/assessment/HistorySkeleton";
import { BreadCrumb } from "./BreadCrumb";

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

  if (loading) return <AssessmentHistorySkeleton />;

  if (history.length === 0) return <NoDataComponent />;

  return (
    <div className="h-full px-6 md:px-10 py-4 md:py-7">
      <BreadCrumb />

      <div className="flex justify-between items-center my-3">
        <h1 className="text-black text-3xl font-bold">
          Previous Assessment Results
        </h1>
        <SecondaryButton
          title="Back to Latest Result"
          onClickHandler={handleBack}
          className="text-sm text-black bg-custom-orange-dark"
        />
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {history.map((item, index) => (
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
                  <div
                    key={idx}
                    className={`text-xs px-3 py-1 font-medium rounded-full ${getBadgeColorClasses(
                      badge.badge
                    )} hover:bg-none hover:shadow-none hover:text-inherit`}
                  >
                    {badge.categoryName} - {badge.badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NoDataComponent = () => {
  return (
    <div className="h-full px-6 md:px-10 py-4 md:py-7 flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-3xl font-bold text-black">
        No assessment history found
      </p>
      <p className="text-gray-600 text-base md:text-lg max-w-md">
        You haven't completed any assessments yet. Start a new assessment to see
        your results and career recommendations.
      </p>
    </div>
  );
};

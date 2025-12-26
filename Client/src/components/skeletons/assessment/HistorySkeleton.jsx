import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays } from "lucide-react";

export const AssessmentHistorySkeleton = () => {
  return (
    <div className="h-full px-6 md:px-10 py-4 md:py-7">
      {/* Breadcrumb Skeleton */}
      <Skeleton className="h-5 w-1/4 rounded-md mb-4" />

      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-2/3 md:h-12 rounded-md" /> {/* Title */}
        <Skeleton className="h-10 w-36 md:h-12 rounded-md" />{" "}
        {/* Back button */}
      </div>

      {/* History Items Skeleton */}
      <div className="flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white"
          >
            <div className="flex justify-between flex-wrap gap-4 mb-4">
              {/* Session Info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
                <Skeleton className="h-5 w-32 rounded-md" /> {/* Session ID */}
              </div>
              <Skeleton className="h-10 w-28 md:h-12 rounded-md" />{" "}
              {/* View details button */}
            </div>

            {/* Careers Skeleton */}
            <div className="mt-2">
              <Skeleton className="h-5 w-24 rounded-md mb-2" />{" "}
              {/* Top Careers heading */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 3 }).map((_, idx2) => (
                  <Skeleton key={idx2} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>

            {/* Badges Skeleton */}
            <div className="mt-4">
              <Skeleton className="h-5 w-32 rounded-md mb-2" />{" "}
              {/* Category Badges heading */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 4 }).map((_, idx3) => (
                  <Skeleton key={idx3} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function AssessmentQuestionSkeleton({ optionsCount = 4 }) {
  return (
    <div className="h-full flex flex-col grow 3xl:max-w-7xl 3xl:mx-auto justify-between 3xl:items-center 3xl:justify-center px-6 md:px-10 py-4 md:py-7 lg:pt-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {/* Breadcrumb Skeleton */}
          <Skeleton className="w-1/3 h-4 md:h-8 rounded-md" />

          {/* Section Heading Skeleton */}
          <Skeleton className="w-1/2 h-6 md:h-16 rounded-md" />

          {/* Question Text Skeleton */}
          <Skeleton className="w-full max-w-2xl h-8 md:h-10 rounded-md" />

          {/* Options Skeleton */}
          <div className="flex flex-col gap-4">
            {Array.from({ length: optionsCount }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Radio button skeleton */}
                <Skeleton className="h-4 w-4 md:h-6 md:w-6 rounded-full" />
                {/* Option text skeleton */}
                <Skeleton className="h-5 md:h-6 w-3/4 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 md:h-12 w-28 md:w-36 rounded-full" />
          <Skeleton className="h-10 md:h-12 w-28 md:w-36 rounded-full" />
        </div>
      </div>

      {/* Progress Bar Skeleton */}
      <Skeleton className="w-full h-3 rounded-full mt-4" />
    </div>
  );
}

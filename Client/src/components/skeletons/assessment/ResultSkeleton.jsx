import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const AssessmentResultSkeleton = () => {
  return (
    <div className="h-full px-6 md:px-10 py-4 md:py-7">
      <div className="flex flex-col 3xl:items-center 3xl:justify-center gap-6 md:gap-8">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-4 w-full max-w-4xl">
          <Skeleton className="h-5 w-1/4 md:h-6 rounded-md" />{" "}
          {/* Breadcrumb */}
          <Skeleton className="h-12 md:h-16 w-3/4 rounded-md" /> {/* Title */}
          <Skeleton className="h-8 md:h-10 w-full rounded-md" />{" "}
          {/* Subtitle */}
        </div>

        {/* Badges & Careers Skeleton */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row lg:items-start gap-10 lg:gap-14 xl:gap-24 2xl:gap-28 3xl:gap-32 border border-transparent lg:border-none 3xl:w-[900px]">
          {/* Traits / Badges */}
          <div className="lg:w-2/5 sm:w-1/2 w-full flex flex-col gap-4">
            <Skeleton className="h-8 w-1/3 rounded-md" /> {/* Heading */}
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <Skeleton className="h-6 w-2/3 rounded-md" /> {/* Badge name */}
                <Skeleton className="h-3 w-full rounded-full" />{" "}
                {/* Progress bar */}
              </div>
            ))}
          </div>

          <div className="hidden lg:block w-[2px] bg-gray-300 h-[380px]" />

          {/* Recommended Careers */}
          <div className="flex flex-col flex-1 gap-3 3xl:w-full">
            <Skeleton className="h-8 w-1/3 rounded-md" /> {/* Heading */}
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <Skeleton className="h-6 w-2/3 rounded-md" />{" "}
                {/* Career name */}
                <Skeleton className="h-4 w-full ml-6 rounded-md" />{" "}
                {/* Reason */}
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-3 md:mt-6 mt-4">
              <Skeleton className="h-12 md:h-14 w-36 rounded-md" />
              <Skeleton className="h-12 md:h-14 w-36 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

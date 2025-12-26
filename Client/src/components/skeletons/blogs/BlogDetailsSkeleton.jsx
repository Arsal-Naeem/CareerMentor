import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const BlogDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-4 sm:px-8 md:px-10 lg:px-20 py-10">
      <div className="w-full flex flex-col h-full gap-3 lg:gap-7">
        {/* Header Skeleton */}
        <div className="grid grid-cols-3 gap-5">
          {/* Large image skeleton */}
          <Skeleton className="w-full h-60 col-span-3 lg:col-span-2 lg:h-72 rounded-2xl" />
          {/* Smaller content skeleton */}
          <Skeleton className="w-full h-60 lg:h-72 col-span-3 rounded-md lg:col-span-1" />
        </div>

        {/* Event Details Skeleton */}
        <div className="flex flex-col gap-6 text-black">
          {/* Intro paragraph */}
          <Skeleton className="w-full h-28 rounded-md" />
          {/* ProseKit content */}
          <Skeleton className="w-full h-96 rounded-md" />
        </div>
      </div>

      {/* Recommended Blogs */}
      <div className="flex flex-col gap-5">
        {/* Section title skeleton */}
        <Skeleton className="w-1/3 h-8 md:h-12 rounded-md" />

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-[250px] lg:h-[300px] rounded-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

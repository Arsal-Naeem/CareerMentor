import { Skeleton } from "@/components/ui/skeleton";

export const DomainCardSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-5 rounded-xl bg-card border border-border">
          {/* Image */}
          <Skeleton className="w-full h-40 rounded-lg mb-3" />

          {/* Title */}
          <Skeleton className="h-5 w-3/4 mb-2" />

          {/* Description */}
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
};

export const RoadmapSkeleton = ({ count = 4, isSmallScreen }) => {
  return (
    <div className="relative">
      {/* Vertical line (desktop only) */}
      {!isSmallScreen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-muted" />
      )}

      <div className="flex flex-col gap-12 relative">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`flex ${
              !isSmallScreen && index % 2 === 0
                ? "justify-start"
                : !isSmallScreen
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {/* Card */}
            <div className="w-full md:w-[45%] bg-white border border-gray-100 rounded-2xl shadow-md p-6">
              {/* Module title */}
              <Skeleton className="h-6 w-3/4 mb-4" />

              {/* Description */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />

              {/* Meta row */}
              <div className="flex gap-3 mb-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Expand button placeholder */}
              <Skeleton className="h-8 w-32 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RoadMapDetailsHeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-40" />

      {/* Title */}
      <Skeleton className="h-7 w-72 md:w-96" />
    </div>
  );
};

export const RoadmapEnrollButtonSkeleton = () => {
  return <Skeleton className="h-10 w-full md:w-40 rounded-md" />;
};

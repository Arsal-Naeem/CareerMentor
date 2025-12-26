import { Skeleton } from "@/components/ui/skeleton";
import { blogData } from "@/constants";
import { cn } from "@/lib/utils";

export const BlogCardSkeleton = ({ span = "", className = "" }) => {
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", span, className)}
    >
      {/* Background image placeholder */}
      <Skeleton className="absolute inset-0 rounded-2xl" />

      {/* Same overlay as real card */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />

      {/* Bottom content (same positioning) */}
      <div className="absolute bottom-0 p-4 w-full space-y-2">
        {/* Category pill */}
        <Skeleton className="h-4 w-24 rounded-full bg-white/70" />

        {/* Title */}
        <Skeleton className="h-4 w-4/5 bg-white/70" />
        <Skeleton className="h-4 w-3/5 bg-white/70" />
      </div>
    </div>
  );
};

export const BlogsGridSkeleton = () => {
  return (
    <div className="grid h-full grid-cols-5 lg:grid-cols-11 auto-rows-[120px] sm:auto-rows-[200px] lg:auto-rows-[150px] xl:auto-rows-[120px] gap-2 md:gap-4 3xl:max-w-7xl 3xl:mx-auto">
      {blogData.map((post) => (
        <BlogCardSkeleton key={post.id} span={post.span} />
      ))}
    </div>
  );
};

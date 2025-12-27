import { Skeleton } from "@/components/ui/skeleton";

export const QuizListSkeleton = ({ count = 3 }) => {
  return (
    <div className="flex gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-24 rounded-md" />
      ))}
    </div>
  );
};

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-6">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-2 px-3 py-1 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <span className="text-sm text-gray-600 font-medium">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      <Button
        size="sm"
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-2 px-3 py-1 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

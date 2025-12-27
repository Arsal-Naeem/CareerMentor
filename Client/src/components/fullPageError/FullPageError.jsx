import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/DashboardLayout";

export const FullPageError = ({
  title = "Something went wrong",
  subtitle = "We couldn’t load this content. Please try again later.",
  onRetry,
  showTryAgainButton = false,
}) => {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center bg-white border border-gray-100 shadow-md rounded-2xl p-8">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-7 w-7 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 mb-6">{subtitle}</p>

          {/* Actions */}
          <div className="flex justify-center gap-3">
            {onRetry && (
              <Button variant="outline" onClick={onRetry}>
                Try Again
              </Button>
            )}
            {showTryAgainButton && (
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

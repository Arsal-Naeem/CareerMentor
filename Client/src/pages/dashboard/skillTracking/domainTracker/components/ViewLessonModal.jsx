import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useGetSingleLessonDetails } from "@/apis/skillTracking/lessonTracking/lessonTracking.services";

const ViewLessonModal = ({ open, onClose, lesson }) => {
  const lessonId = lesson?.id;
  const { data, isLoading, isError, refetch } = useGetSingleLessonDetails(
    lessonId,
    { enabled: !!lessonId }
  );

  useEffect(() => {
    if (lessonId) refetch();
  }, [lessonId, refetch]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[95vw] sm:w-[90vw] md:w-[80vw]
          max-w-full sm:max-w-3xl
          max-h-[90vh]
          overflow-y-auto overflow-x-hidden
          rounded-2xl p-5 sm:p-6
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900 text-center">
            {data?.title || "Lesson Details"}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-10 text-gray-500">
            <Loader2 className="animate-spin mr-2" size={20} />
            Loading lesson details...
          </div>
        ) : isError ? (
          <div className="text-red-500 text-center py-6">
            Failed to load lesson details.
          </div>
        ) : (
          <div className="space-y-8 text-sm sm:text-base text-gray-700">
            {/* Lesson Info */}
            <section>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                Lesson Information
              </h3>
              <div className="space-y-3 pl-1">
                <p>
                  <strong className="text-gray-900">Description:</strong>{" "}
                  {data?.description || "No description available."}
                </p>
              </div>
            </section>

            {/* Learning Points */}
            {data?.learningPoints?.length > 0 && (
              <section>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  Learning Points
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.learningPoints.map((point) => (
                    <li key={point.id}>{point.point}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Examples */}
            {data?.examples?.length > 0 && (
              <section>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  Examples
                </h3>
                <div className="space-y-4">
                  {data.examples.map((ex) => (
                    <div
                      key={ex.id}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                      <p className="text-sm text-gray-800 mb-2 font-medium">
                        {ex.description}
                      </p>
                      {ex.codeSnippet && (
                        <pre className="bg-gray-900 text-white text-xs sm:text-sm p-3 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
                          {ex.codeSnippet}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Resources */}
            {data?.resources?.length > 0 && (
              <section>
                <Separator className="my-3" />
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  Resources
                </h3>
                <ul className="space-y-2 text-sm">
                  {data.resources.map((res) => (
                    <li key={res.id}>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline break-all"
                      >
                        {res.type} → {res.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewLessonModal;

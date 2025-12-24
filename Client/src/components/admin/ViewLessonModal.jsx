import { GetSingleAdminLesson } from "@/apiService/LessonTracking";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Separator } from "../ui/separator";

const ViewLessonModal = ({ open, onClose, lesson }) => {
  const lessonId = lesson?.id;
  const { data, isLoading, isError, refetch } = GetSingleAdminLesson(lessonId, {
    enabled: !!lessonId,
  });

  useEffect(() => {
    if (lessonId) refetch();
  }, [lessonId, refetch]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[80vw] max-w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-5 sm:p-6">
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 text-sm sm:text-base">
                  <p>
                    <strong className="text-gray-900">Mandatory:</strong>{" "}
                    {data?.isMandatory ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong className="text-gray-900">Sequence:</strong>{" "}
                    {data?.sequence ?? "-"}
                  </p>
                  <p>
                    <strong className="text-gray-900">Created At:</strong>{" "}
                    {data?.createdAt
                      ? new Date(data.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Learning Points */}
            {data?.learningPoints?.length > 0 && (
              <section>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  Learning Points
                </h3>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  {data.learningPoints.map((point, i) => (
                    <li key={point.id} className="ml-1">
                      <span className="font-medium text-gray-800">
                        {point.point}
                      </span>
                      {point.subPoints && point.subPoints.length > 0 && (
                        <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-700">
                          {point.subPoints.map((sp, idx) => (
                            <li key={idx}>
                              {sp.label && <strong>{sp.label}:</strong>}{" "}
                              {sp.description}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <Separator />

            {/* Examples */}
            {data?.examples?.length > 0 && (
              <section>
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                  Examples
                </h3>
                <div className="space-y-6">
                  {data.examples.map((ex, idx) => (
                    <div
                      key={ex.id}
                      className="p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                        Example {idx + 1}
                      </h4>

                      {/* Description */}
                      {ex.description && (
                        <p className="text-gray-800 mb-2">{ex.description}</p>
                      )}

                      {/* Optional descriptionPoints */}
                      {ex.descriptionPoints &&
                        ex.descriptionPoints.length > 0 && (
                          <ul className="text-gray-700 list-disc list-inside mb-2 ml-4 space-y-1">
                            {ex.descriptionPoints.map((dp, i) => (
                              <li key={i}>
                                {dp.label && <strong>{dp.label}: </strong>}
                                {dp.description}
                              </li>
                            ))}
                          </ul>
                        )}

                      {/* Code snippet */}
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

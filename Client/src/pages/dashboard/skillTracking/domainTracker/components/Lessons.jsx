import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useGlobalContext } from "@/context/GlobalContext";
import usePageTitle from "@/hooks/usePageTitle";
import { ArrowLeft } from "lucide-react";
import { BreadCrumb } from "@/components/careerAssessment/BreadCrumb";
import { useLessonQuizzes, useModuleLessons, useSubmitQuiz } from "@/apis/skillTracking/lessonTracking/lessonTracking.services";

const Lessons = () => {
  usePageTitle("Module Lessons");
  const { setBreadcrumbText } = useGlobalContext();
  const { id: moduleId } = useParams();
  const navigate = useNavigate();

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Hooks
  const { data: lessonsData, isLoading: lessonsLoading } = useModuleLessons(moduleId);
  const lessons = lessonsData?.lessons || [];
  const { data: quizData, refetch: refetchQuizzes } = useLessonQuizzes(currentLesson?.id, !!currentLesson && showQuizModal);
  const quizzes = quizData?.quizzes || [];
  const submitQuiz = useSubmitQuiz();

  useEffect(() => {
    setBreadcrumbText(`Skill Tracker/Module/${moduleId}/Lessons`);
  }, [moduleId, setBreadcrumbText]);

  // Handlers
  const handleQuizeStart = async (lesson) => {
    setCurrentLesson(lesson);
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setShowQuizModal(true);
    await refetchQuizzes();
  };

  const handleViewLesson = (lesson) => {
    setCurrentLesson(lesson);
    setShowViewModal(true);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOption) return toast.warning("Please select an option.");

    const currentQuiz = quizzes[currentQuizIndex];
    const payload = {
      lessonId: currentLesson.id,
      quizQuestionId: currentQuiz.id,
      selectedOption: parseInt(selectedOption),
    };

    try {
      const res = await submitQuiz.mutateAsync(payload);
      if (res.isCorrect) toast.success(`Correct! You earned ${res.xpAwarded} XP 🎉`);
      else toast.warning("Oops! Incorrect answer.");
    } catch (error) {
      if (error.response?.data?.message === "Already answered") toast.warning("You've already answered this question.");
      else toast.error("Failed to submit answer. Please try again.");
      return;
    }

    if (currentQuizIndex === quizzes.length - 1) {
      toast.success("Quiz completed!");
      setShowQuizModal(false);
      setCurrentLesson(null);
      setSelectedOption(null);
      setCurrentQuizIndex(0);
    } else {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-5 md:px-10 pt-5 pb-10 flex flex-col gap-6">
        <BreadCrumb />

        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Lessons in this Module
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Complete lessons and quizzes to earn XP & badges 🎯
          </p>
        </div>

        {/* Lessons Grid */}
        {lessonsLoading ? (
          <p className="text-gray-500 text-sm">Loading lessons...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {lessons.map((lesson) => {
              const isCompleted = lesson.answeredQuiz === lesson.totalQuiz;
              return (
                <div key={lesson.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Lesson {lesson.sequence}
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-[11px] font-medium">
                      ⭐ {lesson.obtainedXP}/{lesson.xp} XP
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex-1 px-5 py-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h2>
                      <p className="text-sm text-gray-600 line-clamp-3">{lesson.description}</p>
                    </div>

                    <div className="border-t border-gray-100 my-3"></div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>⏱ {lesson.estimatedTime || "N/A"}</span>
                      <span>Quiz {lesson.answeredQuiz}/{lesson.totalQuiz}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 pb-4 mt-auto flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#59A4C0] text-[#59A4C0] hover:bg-[#59A4C0]/10 text-sm"
                      onClick={() => handleViewLesson(lesson)}
                    >
                      View Lesson
                    </Button>
                    <Button
                      className={`flex-1 text-sm font-semibold ${
                        isCompleted
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-[#ED843B] hover:bg-[#ED843B]/90 text-white"
                      }`}
                      onClick={() => handleQuizeStart(lesson)}
                      disabled={isCompleted}
                    >
                      {isCompleted ? "Completed" : "Start Quiz"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* View Lesson Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-lg rounded-xl p-5">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-black">
              {currentLesson?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-3 space-y-3">
            <p className="text-sm text-gray-700">{currentLesson?.description}</p>
            <div className="border-t border-gray-200"></div>
            <div className="text-sm text-gray-600">{currentLesson?.content || "Lesson content will appear here."}</div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Modal */}
      <Dialog open={showQuizModal} onOpenChange={setShowQuizModal}>
        <DialogContent className="max-w-md rounded-xl p-5">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-black">
              Quiz — {currentLesson?.title}
            </DialogTitle>
          </DialogHeader>

          {quizzes.length > 0 ? (
            <div className="flex flex-col gap-4 mt-2">
              <p className="text-base font-medium text-black">{quizzes[currentQuizIndex]?.question}</p>

              <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="flex flex-col gap-3">
                {[1, 2, 3, 4].map((num) => {
                  const optionText = quizzes[currentQuizIndex]?.[`option${num}`];
                  return (
                    <div key={num} className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer border hover:bg-gray-50 transition ${selectedOption === num.toString() ? "border-[#59A4C0] bg-[#59A4C0]/10" : "border-gray-200"}`}>
                      <RadioGroupItem value={num.toString()} id={`option-${num}`} />
                      <Label htmlFor={`option-${num}`} className="text-sm cursor-pointer">{optionText || `Option ${num}`}</Label>
                    </div>
                  );
                })}
              </RadioGroup>

              <Button className="w-full bg-[#59A4C0] hover:bg-[#59A4C0]/90 text-white mt-2" onClick={handleSubmitAnswer}>
                {currentQuizIndex === quizzes.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No quiz available for this lesson.</p>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Lessons;

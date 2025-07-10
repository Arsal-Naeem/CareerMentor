import DashboardLayout from "@/layouts/DashboardLayout";
import axiosReq from "@/services/axiosHelper";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useGlobalContext } from "@/context/GlobalContext";
import usePageTitle from "@/hooks/usePageTitle";
import { ArrowLeft } from "lucide-react";
import { BreadCrumb } from "@/components/careerAssessment/BreadCrumb";

const Lessons = () => {
  usePageTitle("Module Lessons");
  const { setBreadcrumbText } = useGlobalContext();

  // TODO : make it dynamic
  useEffect(() => {
    setBreadcrumbText(`Skill Tracker/Frontend Development/${id}/Lessons`);
  }, []);

  const { id } = useParams();
  const [lessons, setLessons] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const [quizList, setQuizList] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const navigate = useNavigate();

  const fetchAllLessonOfModule = async () => {
    try {
      const response = await axiosReq(
        "GET",
        `/skill-modules/module/${id}/enrolled-lessons`
      );
      setLessons(response.data.lessons);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log("error on fetchAllLessonOfModule", error.message);
    }
  };

  useEffect(() => {
    fetchAllLessonOfModule();
  }, []);

  const handleQuizeStart = async (lesson) => {
    try {
      const response = await axiosReq(
        "GET",
        `skill-modules/lesson/${lesson.id}/user-quizzes`
      );

      const quizzes = response.data.quizzes;
      if (quizzes.length === 0) {
        toast.warning("No quiz available for this lesson.");
        return;
      }

      setCurrentLesson(lesson);
      setQuizList(quizzes); // ✅ Save full list
      setCurrentQuizIndex(0); // ✅ Start from first

      const firstQuiz = quizzes[0];
      const options = [
        { id: 1, text: firstQuiz.option1 },
        { id: 2, text: firstQuiz.option2 },
        { id: 3, text: firstQuiz.option3 },
        { id: 4, text: firstQuiz.option4 },
      ];

      setQuizData({
        quizId: firstQuiz.id,
        question: firstQuiz.question,
        options,
      });

      setSelectedOption(null);
      setSelectedQuizId(firstQuiz.id);
      setShowModal(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log("error on handleQuizeStart", error.message);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOption) {
      toast.warning("Please select an option.");
      return;
    }

    const currentQuiz = quizList[currentQuizIndex];

    const payload = {
      lessonId: currentLesson.id,
      quizQuestionId: currentQuiz.id,
      selectedOption: parseInt(selectedOption),
    };
    console.log(payload);

    try {
      const response = await axiosReq(
        "POST",
        "/skill-modules/quiz/answer",
        payload
      );

      const { isCorrect, xpAwarded } = response.data;

      if (isCorrect) {
        toast.success(`Correct! You earned ${xpAwarded} XP 🎉`);
      } else {
        toast.warning("Oops! That was incorrect. No XP awarded.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Already answered"
      ) {
        toast.warning("You've already answered this question.");
      } else {
        toast.error("Failed to submit answer. Please try again.");
        console.error("Submit Answer Error:", error.message);
        return; // stop further processing on general error
      }
    }

    const isLastQuiz = currentQuizIndex === quizList.length - 1;

    if (isLastQuiz) {
      toast.success("Quiz completed!");
      // Reset modal state
      setShowModal(false);
      setSelectedOption(null);
      setCurrentLesson(null);
      setQuizData(null);
      setQuizList([]);
      setCurrentQuizIndex(0);
    } else {
      // Move to next quiz
      const nextQuizIndex = currentQuizIndex + 1;
      const nextQuiz = quizList[nextQuizIndex];
      const options = [
        { id: 0, text: nextQuiz.option1 },
        { id: 1, text: nextQuiz.option2 },
        { id: 2, text: nextQuiz.option3 },
        { id: 3, text: nextQuiz.option4 },
      ];

      setQuizData({
        quizId: nextQuiz.id,
        question: nextQuiz.question,
        options,
      });

      setSelectedOption(null);
      setCurrentQuizIndex(nextQuizIndex);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-5 md:px-10 pt-5 pb-10 flex flex-col gap-6">
        {/* Back Button */}
        <BreadCrumb />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="px-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Heading */}
        <h1 className="text-xl md:text-2xl font-semibold text-black">
          Lessons in this Module
        </h1>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-2 border"
            >
              <span className="text-sm text-gray-500">
                Lesson {lesson.sequence}
              </span>
              <h2 className="text-lg font-semibold text-black">
                {lesson.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {lesson.description}
              </p>
              <div className="flex items-center justify-between text-xs mt-2 text-gray-600">
                <span>⏱ {lesson.estimatedTime || "N/A"}</span>
                <span>⭐ {lesson.xp} XP</span>
              </div>
              <Button
                className="mt-3 w-full"
                onClick={() => handleQuizeStart(lesson)}
              >
                Start Quiz
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-black">
              Quiz — {currentLesson?.title}
            </DialogTitle>
          </DialogHeader>

          {quizData ? (
            <div className="flex flex-col gap-4 mt-2">
              {/* Question */}
              <p className="text-base font-medium text-black">
                {quizData.question}
              </p>

              {/* Options */}
              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="flex flex-col gap-3"
              >
                {[0, 1, 2, 3].map((num) => {
                  const optionText = quizData.options?.[num]?.text;
                  return (
                    <div
                      key={num}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition"
                    >
                      <RadioGroupItem
                        value={num.toString()}
                        id={`option-${num}`}
                      />
                      <Label
                        htmlFor={`option-${num}`}
                        className="text-sm cursor-pointer"
                      >
                        {optionText || `Option ${num + 1}`}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              {/* Submit Button */}
              <div className="pt-2">
                <Button className="w-full" onClick={handleSubmitAnswer}>
                  {currentQuizIndex === quizList.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No quiz available for this lesson.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Lessons;

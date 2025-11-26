import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStartQuiz } from "@/apis/skillTracking/quizTracking/quizetracking.api";

const QuizModal = ({ open, onClose, quiz }) => {
  const [questions, setQuestions] = useState([]); // parsed questions array
  const [currentIndex, setCurrentIndex] = useState(0); // current question index
  const [userAnswers, setUserAnswers] = useState([]); // store selected answers

  const { data, isLoading } = useStartQuiz(quiz?.id, {
    enabled: !!quiz,
  });

  // Parse quiz question string into array of question objects
  useEffect(() => {
    if (data?.question) {
      const rawQuestions = data.question.split(/\n(?=Question \d+:)/g); // split by Question number
      const parsed = rawQuestions.map((q) => {
        const [questionLine, ...options] = q.split("\n").filter(Boolean);
        return {
          text: questionLine.replace(/^Question \d+:\s*/, ""),
          options: options.map((opt) => opt.trim()),
        };
      });
      setQuestions(parsed);
      console.log("Parsed Questions:", parsed);
    }
  }, [data]);

  if (!quiz) return null;
  if (isLoading) return <div>Loading...</div>;

  const handleSelectAnswer = (option) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = option; // store answer for current question
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All questions answered, log result
      questions.forEach((q, i) => {
        console.log(`Q${i + 1}: ${q.text}`);
        console.log(`Selected Answer: ${userAnswers[i] || "No answer"}`);
      });
      alert("Quiz completed! Check console for results.");
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {quiz.quizTitle}
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-3" />

        {currentQuestion && (
          <div className="space-y-4">
            <p className="text-gray-700 font-medium">
              {`Question ${currentIndex + 1}: ${currentQuestion.text}`}
            </p>
            <div className="space-y-2">
              {currentQuestion.options.map((opt, idx) => (
                <Button
                  key={idx}
                  variant={
                    userAnswers[currentIndex] === opt ? "default" : "outline"
                  }
                  className="w-full text-left"
                  onClick={() => handleSelectAnswer(opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>

            <Button className="w-full mt-2" onClick={handleNext}>
              {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
            </Button>

            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;

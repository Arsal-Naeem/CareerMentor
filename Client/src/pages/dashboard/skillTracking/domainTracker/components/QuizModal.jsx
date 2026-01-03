import { StartQuiz } from "@/apiService/QuizTracking";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const QuizModal = ({ open, onClose, quiz }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [preparing, setPreparing] = useState(true);

  const { data, isLoading } = StartQuiz(quiz?.id, { enabled: !!quiz });

  useEffect(() => {
    if (data?.question && Array.isArray(data.question)) {
      const parsed = data.question.map((q) => ({
        text: q.questionText,
        options: Object.entries(q.options).map(([key, value]) => ({
          key,
          text: value,
        })),
        correctAnswer: q.correctAnswer, // key like "A", "B"
      }));
      setQuestions(parsed);
      setPreparing(false);
    }
  }, [data]);

  if (!quiz) return null;

  if (isLoading || preparing)
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md w-full flex flex-col items-center justify-center py-16">
          <Loader2 className="animate-spin w-12 h-12 text-[#59A4C0] mb-4" />
          <p className="text-gray-700 text-center">Preparing your quiz...</p>
        </DialogContent>
      </Dialog>
    );

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (optionKey) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = optionKey;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz completed, calculate score
      let correctCount = 0;
      questions.forEach((q, i) => {
        if (userAnswers[i] === q.correctAnswer) correctCount++;
        console.log(
          `Q${i + 1}: ${q.text} | Your answer: ${
            userAnswers[i] || "No answer"
          } | Correct: ${q.correctAnswer}`
        );
      });
      console.log(`Total: ${questions.length}, Correct: ${correctCount}`);
      alert(
        `Quiz completed! You got ${correctCount}/${questions.length} correct. Check console for details.`
      );
      onClose();
    }
  };

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full max-h-[80vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {quiz.quizTitle}
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-3" />

        {currentQuestion && (
          <div className="flex flex-col space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentIndex + 1}/{questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full bg-[#FFD272] rounded-full h-3 overflow-hidden">
              <div
                className="h-3 transition-all duration-300"
                style={{ width: `${progressPercent}%`, backgroundColor: "#59A4C0" }}
              />
            </div>

            {/* Question */}
            <p className="text-gray-800 font-medium mt-4 break-words whitespace-pre-wrap">
              {currentQuestion.text}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((opt) => (
                <Button
                  key={opt.key}
                  variant={
                    userAnswers[currentIndex] === opt.key ? "default" : "outline"
                  }
                  className="w-full text-left break-words whitespace-normal"
                  onClick={() => handleSelectAnswer(opt.key)}
                >
                  {opt.text}
                </Button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between gap-2 mt-4 flex-wrap">
              {currentIndex > 0 && (
                <Button
                  variant="outline"
                  className="flex-1 min-w-[120px]"
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                  Previous
                </Button>
              )}
              <Button
                className="flex-1 min-w-[120px]"
                onClick={handleNext}
              >
                {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
              </Button>
            </div>

            {/* Close */}
            <Button
              variant="ghost"
              className="w-full mt-2 text-gray-700"
              onClick={onClose}
            >
              Close Quiz
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;

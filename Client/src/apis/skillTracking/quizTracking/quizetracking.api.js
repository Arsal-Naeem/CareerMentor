import { useQuery } from "@tanstack/react-query";
import { unlockQuiz,getAllQuizzes,startQuiz } from "./quizTracking.services";

export const useUnlockQuiz = (moduleId) => {
  return useQuery({
    queryKey: ["unlockQuiz", moduleId],
    queryFn: () => unlockQuiz(moduleId),
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
  });
}

export const useGetAllQuiz= (moduleId) => {
  return useQuery({
    queryKey: ["allQuizzes", moduleId],
    queryFn: () => getAllQuizzes(moduleId),
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
  });
}

export const useStartQuiz = (quizId) => {
  return useQuery({
    queryKey: ["startQuiz", quizId],
    queryFn: () => startQuiz(quizId),
    enabled: !!quizId,
    refetchOnWindowFocus: false,
  });
}
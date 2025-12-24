import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useQuery } from "@tanstack/react-query";

export const UnlockQuiz = (moduleId) => {
  return useQuery({
    queryKey: ["unlockQuiz", moduleId],
    queryFn: async (moduleId) => {
      const url = API_ROUTES.QUIZZES.UNLOCK_QUIZ(moduleId);
      const res = await axiosReq(API_MODES.POST, url);
      return res.data;
    },
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
  });
};

export const GetAllQuizes = (moduleId) => {
  return useQuery({
    queryKey: ["allQuizzes", moduleId],
    queryFn: async (moduleId) => {
      const url = API_ROUTES.QUIZZES.GET_ALL_QUIZZES(moduleId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
  });
};

export const StartQuiz = (quizId) => {
  return useQuery({
    queryKey: ["startQuiz", quizId],
    queryFn: async (quizId) => {
      const url = API_ROUTES.QUIZZES.START_QUIZ(quizId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!quizId,
    refetchOnWindowFocus: false,
  });
};

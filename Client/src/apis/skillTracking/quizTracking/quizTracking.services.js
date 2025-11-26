import { ADMIN_API_ROUTES, API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

//@POST || Unlock quiz for a module
export const unlockQuiz = async (moduleId) => {
  const url = API_ROUTES.QUIZZES.UNLOCK_QUIZ(moduleId);
  const res = await axiosReq(API_MODES.POST, url);
  return res.data;
}

//@GET || Get all quizzes for a module

export const getAllQuizzes = async (moduleId) => {
  const url = API_ROUTES.QUIZZES.GET_ALL_QUIZZES(moduleId);
  const res = await axiosReq(API_MODES.GET, url);
  return res.data;
}

//@GET || Start a quiz by quizId
export const startQuiz = async (quizId) => {
  const url = API_ROUTES.QUIZZES.START_QUIZ(quizId);
  const res = await axiosReq(API_MODES.GET, url);
  return res.data;
}
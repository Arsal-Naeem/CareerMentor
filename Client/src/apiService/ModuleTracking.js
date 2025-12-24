import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useQuery } from "@tanstack/react-query";

export const GetUserEnrolledModule = (domainId, page = 1, perPage = 6) => {
  return useQuery({
    queryKey: ["userEnrolledModules", domainId, page],
    queryFn: async (domainId, page = 1, perPage = 6) => {
      const url = `${API_ROUTES.SKILLMODULE.GET_USER_ENROLLED(
        domainId
      )}?page=${page}&perPage=${perPage}`;
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!domainId, // only run if domainId exists
    staleTime: 1000 * 60 * 5, // 5 min cache
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("❌ Error fetching enrolled modules:", error);
    },
  });
};

export const GetAllModulesFromDomain = (domainId) => {
  return useQuery({
    queryKey: ["allModulesFromDomain", domainId],
    queryFn: async (domainId) => {
      const url = API_ROUTES.MODULES.GET_ALL_MODULES_FROM_DOMAIN(domainId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!domainId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("❌ Error fetching all modules from domain:", error);
    },
  });
};

import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useQuery } from "@tanstack/react-query";

export const GetRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const url = API_ROUTES.ROADMAPS.GET_ROADMAPS;
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    onError: (err) => console.error("Failed to fetch roadmaps:", err),
  });
};

// export const GetDashboardData = () => {
//   return useQuery({
//     queryKey: ["dashboardData"],
//     queryFn: async () => {
//       const url = API_ROUTES.ROADMAPS.GET_DASHBOARD_DATA();
//       const res = await axiosReq(API_MODES.GET, url);
//       return res.data;
//     },
//   });
// };

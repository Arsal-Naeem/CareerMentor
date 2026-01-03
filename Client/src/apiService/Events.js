import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useQuery } from "@tanstack/react-query";

export const GetAllEvents = ({
  page = 1,
  limit = 9,
  search = "",
  tagName = null,
}) => {
  return useQuery({
    queryKey: ["adminEvents", page, limit, search, tagName], // ✅ Added all params to queryKey
    queryFn: async () => {
      const url = ADMIN_API_ROUTES.EVENTS.GET_ALL_EVENTS;

      // ✅ Build query params
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (tagName) params.append("tagName", tagName);

      const res = await axiosReq(API_MODES.GET, `${url}?${params.toString()}`);
      return res.data;
    },
  });
};

// ---------- USER APIS -----------
export const FetchEventsForUsers = ({
  page = 1,
  limit = 6,
  search = "",
  tagName = null,
}) => {
  return useQuery({
    queryKey: ["eventsForUsers", page, limit, search, tagName],
    queryFn: async () => {
      const url = API_ROUTES.EVENTS.FETCH_EVENTS_FOR_USERS;

      // Build query params
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (tagName) params.append("tagName", tagName);

      // Pass params to API
      const res = await axiosReq(API_MODES.GET, `${url}?${params.toString()}`);
      return res.data;
    },
  });
};

export const FetchSingleEventForUsers = (slug) => {
  return useQuery({
    queryKey: ["singleEvent", slug],
    queryFn: async () => {
      const url = API_ROUTES.EVENTS.FETCH_SINGLE_EVENT(slug);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
};

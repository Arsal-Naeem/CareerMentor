import { ADMIN_API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const GetAllCareers = ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  sortBy = "createdAt",
  order = "DESC",
}) => {
  return useQuery({
    queryKey: ["adminCareers", page, limit, search, status, sortBy, order],
    queryFn: async () => {
      const url = ADMIN_API_ROUTES.CAREER_EXPLORER.GET_ALL_CAREERS;

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);

      const res = await axiosReq(API_MODES.GET, `${url}?${params.toString()}`);
      return res.data;
    },
  });
};

// Get Career By ID
export const GetCareerById = (careerId) => {
  return useQuery({
    queryKey: ["career", careerId],
    queryFn: async () => {
      const url = ADMIN_API_ROUTES.CAREER_EXPLORER.GET_CAREER(careerId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!careerId,
  });
};

// Add Career
export const AddCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const url = ADMIN_API_ROUTES.CAREER_EXPLORER.CREATE_CAREER;
      const res = await axiosReq(API_MODES.POST, url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Career added successfully");
      queryClient.invalidateQueries(["adminCareers"]);
    },
    onError: (error) => {
      console.log("Error adding career", error);
      toast.error(error.response?.data?.message || "Failed to add career");
    },
  });
};

// Update Career
export const UpdateCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ careerId, formData }) => {
      const url = ADMIN_API_ROUTES.CAREER_EXPLORER.UPDATE_CAREER(careerId);
      const res = await axiosReq(API_MODES.PUT, url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Career updated successfully");
      queryClient.invalidateQueries(["adminCareers"]);
      queryClient.invalidateQueries(["career"]);
    },
    onError: (error) => {
      console.log("Error updating career", error);
      toast.error(error.response?.data?.message || "Failed to update career");
    },
  });
};

// Delete Career
export const DeleteCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (careerId) => {
      const url = ADMIN_API_ROUTES.CAREER_EXPLORER.DELETE_CAREER(careerId);
      const res = await axiosReq(API_MODES.DELETE, url);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Career deleted successfully");
      queryClient.invalidateQueries(["adminCareers"]);
    },
    onError: (error) => {
      console.log("Error deleting career", error);
      toast.error(error.response?.data?.message || "Failed to delete career");
    },
  });
};

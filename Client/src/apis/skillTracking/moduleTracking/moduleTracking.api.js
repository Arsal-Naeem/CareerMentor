import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";


//@GET || Get all module 
export const getUserEnrolledModules = async (domainId) => {
  //console.log("This is URL from getUserEnrolledModules", url, domainId);
  const url = API_ROUTES.SKILLMODULE.GET_USER_ENROLLED(domainId);
  const res = await axiosReq(API_MODES.GET, url);
  console.log("This is response from getUserEnrolledModules", res);
  return res.data;
}
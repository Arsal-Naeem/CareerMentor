import { errorResponse } from "../../../utils/handlers/reponseHandler.js";
import { PostModules } from "./moduleServices.js";

export const postModules = async (req, res) => {
 try {
  const { title, description, badge, totalXP, sequence,category } = req.body;

  if (!title || !description || !badge || !totalXP || !sequence || !category) {
    return res
      .status(400)
      .json({ status: 400, message: "All fields are required" });
  }

  const response = await PostModules( 
    category, title, description, badge, totalXP, sequence
  );
  res.status(response.status).json(response);
  
 } catch (error) {
  console.log("Something went wrong",error);
  errorResponse(res, error);
 }
}
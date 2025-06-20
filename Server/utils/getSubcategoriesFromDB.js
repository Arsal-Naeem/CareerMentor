import { Sequelize } from "sequelize";
import { sequelize } from "../config/connectDB.js";
import  AssessmentQuestion  from "../models/assestmentQuestionModel.js";


export const getSubcategoriesByCategory = async (category) => {
  const result = await AssessmentQuestion.findAll({
    where: { category },
    attributes: [
      [Sequelize.fn("DISTINCT", sequelize.col("subcategory")), "subcategory"]
    ],
    raw: true
  });

  console.log("Subcategories for category:", category, result);

  return result.map(r => r.subcategory);
};
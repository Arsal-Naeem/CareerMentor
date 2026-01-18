import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";
import category from "./assessmentCategoryModel.js";

const AssessmentSessionQuestion = sequelize.define(
  "assessmentsessionquestion",
  {
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "assessmentsession",
        key: "sessionId",
      },
      onDelete: "CASCADE",
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "assessmentquestion",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
    }
  }
);

export default AssessmentSessionQuestion;

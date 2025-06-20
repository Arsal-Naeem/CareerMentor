import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";

const AssessmentQuestion = sequelize.define(
  "AssessmentQuestion",
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bloomLevel: {
      type: DataTypes.ENUM(
        "remember",
        "understand",
        "apply",
        "analyze",
        "evaluate",
        "create"
      ),
      allowNull: false,
    },
    bloomWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);

export default AssessmentQuestion;

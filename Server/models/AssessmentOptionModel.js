import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";

const AssessmentOption = sequelize.define("AssessmentOption", {
  optionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default AssessmentOption;

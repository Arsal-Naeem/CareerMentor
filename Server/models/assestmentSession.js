import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";

const AssessmentSession = sequelize.define("AssessmentSession", {
  sessionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,         // important!
    unique: true,   
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questionIds: {
    type: DataTypes.JSON, // e.g., [101, 102, 103, ...]
    allowNull: false,
  },
  answers: {
    type: DataTypes.JSON, // Array of objects: [{questionId, selectedOptionIndex}]
    defaultValue: [],
  },
  currentIndex: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default AssessmentSession;

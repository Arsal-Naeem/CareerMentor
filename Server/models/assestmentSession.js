import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";

const AssessmentSession = sequelize.define("AssessmentSession", {
  sessionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // auto-generate
    primaryKey: true,
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
    type: DataTypes.JSON,
    allowNull: false,
  },
  currentIndex: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  answers: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default AssessmentSession;

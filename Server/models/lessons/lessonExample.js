import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const LessonExample = sequelize.define(
  "LessonExample",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    codeSnippet: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    descriptionPoints: {
      type: DataTypes.JSON, // array of objects like [{ label: '', description: '' }]
      allowNull: true,
    },
  },
  {
    tableName: "lesson_examples",
    timestamps: true,
    indexes: [{ fields: ["lessonId"] }],
  }
);

export default LessonExample;

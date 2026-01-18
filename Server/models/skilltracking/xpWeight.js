import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const XpWeight = sequelize.define(
  "xp_weights",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lesson_weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quiz_weight: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
    project_weight: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
  },
  {
    tableName: "xp_weights",
    timestamps: true,
  }
);

export default XpWeight;

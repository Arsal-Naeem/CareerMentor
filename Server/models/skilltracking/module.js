import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const Module = sequelize.define(
  "Module",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    badge: {
      type: DataTypes.STRING,
    },
    totalXP: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "modules",
    timestamps: true,
  }
);

export default Module;

import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";

const Tag = sequelize.define("Tag", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  usageCount: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

export default Tag;

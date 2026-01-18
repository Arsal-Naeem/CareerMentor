import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const EventTag = sequelize.define(
  "event_tags",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    }
  },
  {
    tableName: "event_tags",
    timestamps: false,
  }
);

export default EventTag;

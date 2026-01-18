import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";
import User from "../userModel.js";
import Events from "./eventModel.js";

const EventEnrollment = sequelize.define(
  "event_enrollments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      // FK to Users table
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },

    event_id: {
      // FK to Events table
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Events, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },

    status: {
      type: DataTypes.ENUM("enrolled", "cancelled", "attended"),
      defaultValue: "enrolled",
    },
  },
  {
    tableName: "event_enrollments",
    timestamps: true,
    createdAt: "enrolled_at",
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "event_id"],
      },
    ],
  }
);

export default EventEnrollment;

import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";
import EventTag from "./eventTag.js";
import Events from "./eventModel.js";

const EventTagMapping = sequelize.define(
  "event_tag_mapping",
  {
    event_id: {
      type: DataTypes.INTEGER,
      references: { model: Events, key: "id" },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: { model: EventTag, key: "id" },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "event_tag_mapping",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["event_id", "tag_id"], // prevent duplicate mapping
      },
    ],
  }
);

export default EventTagMapping;

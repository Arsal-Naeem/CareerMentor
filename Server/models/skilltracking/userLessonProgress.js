import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const UserLessonProgress = sequelize.define(
  "UserLessonProgress",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER, // must match users.id
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    moduleId: {
      type: DataTypes.INTEGER.UNSIGNED, // must match modules.id
      allowNull: false,
      references: {
        model: "modules",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    lessonId: {
      type: DataTypes.UUID, // must match lessons.id
      allowNull: false,
      references: {
        model: "lessons",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("not_started", "in_progress", "completed"),
      defaultValue: "not_started",
    },
    xpEarned: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },

    locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "user_lesson_progress",
    timestamps: true,
    underscored: true,
    indexes: [{ unique: true, fields: ["user_id", "lesson_id"] }],
  }
);

export default UserLessonProgress;

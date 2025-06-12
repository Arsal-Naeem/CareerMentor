import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";

const Blogs = sequelize.define("Blogs", {
title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverImage: {
  type: DataTypes.STRING,
  allowNull: true,
},
  shortDesc: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  longDesc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },
})

export default Blogs;
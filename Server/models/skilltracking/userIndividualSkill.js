import { sequelize } from "../../config/connectDB.js";
import { DataTypes } from "sequelize";

const UserIndividualSkill = sequelize.define("userIndividualSkill", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customName: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  progress: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isArchived: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default UserIndividualSkill;
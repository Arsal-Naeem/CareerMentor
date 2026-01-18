import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_DB_USER,
  process.env.MYSQL_DB_PASSWORD,
  {
    host: process.env.MYSQL_DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

console.log(
  "processenv",
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_DB_USER,
  process.env.MYSQL_DB_PASSWORD,
  process.env.MYSQL_DB_HOST
);
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    //console.log("MySQL Connected");
  } catch (error) {
    console.error("MySQL connection error:", error.message);
    process.exit(1);
  }
};

export { sequelize };
export default connectDB;

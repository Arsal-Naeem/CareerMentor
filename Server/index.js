import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/connectDB.js';

import authRoutes from './routes/authRoute.js'; 
import startApp from './config/sync.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  connectDB();
  startApp();
  console.log(`Server is running on port ${PORT}`);
});
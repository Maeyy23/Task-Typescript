import express from "express";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./configs/database";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
connectDB(<string>process.env.MONGO_URI);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

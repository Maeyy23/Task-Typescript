import express from "express";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./configs/database";
import customerRoutes from "./routes/customer.routes";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
connectDB(<string>process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", customerRoutes);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

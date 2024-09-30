import express from "express";
import http from "http";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./configs/database";
import customerRoutes from "./routes/customer.routes";
import transactionRoutes from "./routes/purchase.routes";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
connectDB(<string>process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use("/api", customerRoutes);
app.use("/api", transactionRoutes);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

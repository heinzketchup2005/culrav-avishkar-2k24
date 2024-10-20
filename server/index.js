import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./db/connect.js";
import errorHandler from "./ErrorHandlers/error_handler.js";
import adminRouter from "./Routes/admin.routes.js";
import authRoutes from "./Routes/auth.routes.js";
import teamRoutes from "./Routes/team.routes.js";
dotenv.config();

//connect to the mongoDB
connectDB();

const app = express();
app.use(morgan("📋[server-log]: :method :url :status :response-time ms"));
app.use(express.json());

// auth
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Limit to 10 requests per 10 minutes
  message: "Too many attempts, please try again later.",
});

// All routes.
app.use("/api/auth/v1", authLimiter, authRoutes);
app.use("/api/admin/v1", adminRouter);
app.use("/api/team/v1", teamRoutes);

//handle every exceptions and errors before starting the server
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is listening on port : 3000`.bgCyan);
});

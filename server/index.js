import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./db/connect.js";
import errorHandler from "./ErrorHandlers/error_handler.js";
import adminRouter from "./Routes/admin.routes.js";
import authRoutes from "./Routes/auth.routes.js";
import teamRoutes from "./Routes/team.routes.js";

import cors from "cors";

import eventRoutes from "./Routes/event.routes.js";

import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swaggerDocs/swaggerOptions.js";
dotenv.config();

const app = express();
app.use(morgan("📋[server-log]: :method :url :status :response-time ms"));
app.use(express.json());
app.use(cors());

// Connect to the MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Auth rate limiter
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit to 10 requests per 10 minutes
  message: "Too many attempts, please try again later.",
});

// All routes
app.use("/api/auth/v1", authLimiter, authRoutes);
app.use("/api/admin/v1", adminRouter);
app.use("/api/team/v1", teamRoutes);
app.use("/api/event/v1", eventRoutes);

// Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Handle every exception and error before starting the server
// Don't change the position of this errorHandler, because this should be the last middleware to catch all the errors.
app.use(errorHandler);

const server = app.listen(3000, () => {
  console.log("Server is listening on port http://localhost:3000".bgCyan);
});

// If nothing works
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught error`.bgRed);
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Shutting down the server due to unhandled promise rejections`.bgRed
  );
  server.close(() => {
    process.exit(1);
  });
});

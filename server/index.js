import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import errorHandler from "./ErrorHandlers/error_handler.js";
import adminRouter from "./Routes/admin.routes.js";
dotenv.config();

//connect to the mongoDB
connectDB();

const app = express();
app.use(express.json());
app.use("/api/admin", adminRouter);

//handle every exceptions and errors before starting the server
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is listening on port : 3000`.bgCyan);
});

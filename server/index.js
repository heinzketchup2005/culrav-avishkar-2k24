import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import errorHandler from "./ErrorHandlers/error_handler.js";
import adminroutes from "./Routes/admin.routes.js";
dotenv.config();

//connect to the mongoDB
connectDB();

const app = express();
app.use(express.json());

//handle every exceptions and errors before starting the server
app.use(errorHandler);
app.use("/api/admin", adminroutes);
app.listen(3000, () => {
  console.log(`Server is listening on port : 3000`.bgCyan);
});

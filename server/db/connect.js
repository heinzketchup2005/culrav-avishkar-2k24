import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO, {
      connectTimeoutMS: 10000,
    });
    console.log(`Connected to Mongodb database : ${connect.connection.name}`);
  } catch (error) {
    console.log(`Error in mongoDB ${error}`);
  }
};

export default connectDB;

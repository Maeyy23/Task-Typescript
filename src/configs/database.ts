import mongoose from "mongoose";

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

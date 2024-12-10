import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://rajmogare444:rajmogare@cluster0.wtjzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("DB connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit the process with failure
        
    }
}
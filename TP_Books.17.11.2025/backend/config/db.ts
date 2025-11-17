import mongoose from "mongoose";

const connectDB = async (): Promise<typeof mongoose> => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("Missing MONGODB_URI environment variable");
    }

    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(uri);
        console.log("MongoDB connected");
        return mongoose;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDB;
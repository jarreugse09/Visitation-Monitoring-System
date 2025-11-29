import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

// MongoDB connection
const DB = process.env.MONGO_URI || "mongodb://localhost:27017/visitor-management";

mongoose.connect(DB)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Optional: handle unhandled rejections
process.on("unhandledRejection", (err: any) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Optional: handle uncaught exceptions
process.on("uncaughtException", (err: any) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
});

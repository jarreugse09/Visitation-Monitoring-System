import mongoose from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export async function connectDB() {
    mongoose.plugin(philippineTimePlugin);

    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected with Philippine Time plugin");
}

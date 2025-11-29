import mongoose, { Schema, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin"; // <-- import plugin

export interface ICollege extends Document {
    name: string;
    departments: string[];
    isDeleted: boolean;
}

const CollegeSchema = new Schema<ICollege>(
    {
        name: { type: String, required: true },
        departments: [{ type: String }],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true } // <-- important so plugin formats timestamps
);

// Apply the Philippine timezone plugin
CollegeSchema.plugin(philippineTimePlugin);

export const College = mongoose.model<ICollege>("College", CollegeSchema);

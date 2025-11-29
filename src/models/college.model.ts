import mongoose, { Schema, Types, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin"; // <-- import plugin
import { Department } from "./department.model";
export interface ICollege extends Document {
    name: string;
    departments: Types.ObjectId[];
    isDeleted: boolean;
}

const CollegeSchema = new Schema<ICollege>(
    {
        name: { type: String, required: true },
        departments: [{ type: Schema.Types.ObjectId, ref: "Department" }],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true } // <-- important so plugin formats timestamps
);

// Apply the Philippine timezone plugin
CollegeSchema.plugin(philippineTimePlugin);

export const College = mongoose.model<ICollege>("College", CollegeSchema);

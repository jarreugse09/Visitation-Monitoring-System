import mongoose, { Schema, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export interface IDepartment extends Document {
    name: string;
    isDeleted: boolean;
}

const DepartmentSchema: Schema = new Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, }
}, { timestamps: true });

// Apply the Philippine timezone plugin
DepartmentSchema.plugin(philippineTimePlugin);

export const Department = mongoose.model<IDepartment>("Department", DepartmentSchema);

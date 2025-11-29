import mongoose, { Schema, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export interface IVisitor extends Document {
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    TUPID?: string;
    email?: string;
    contactNumber?: string;
    visitorType: "Student" | "Parent" | "Guest" | "Other";
    createdAt: Date;
    updatedAt: Date;
}

const VisitorSchema: Schema = new Schema({
    name: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
    },
    TUPID: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    visitorType: { type: String, enum: ["Student", "Parent", "Guest", "Other"], default: "Guest" },
}, { timestamps: true });

// Apply the Philippine timezone plugin
VisitorSchema.plugin(philippineTimePlugin);

export const Visitor = mongoose.model<IVisitor>("Visitor", VisitorSchema);

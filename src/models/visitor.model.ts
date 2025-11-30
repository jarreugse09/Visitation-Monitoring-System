import mongoose, { Schema, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export interface IVisitor extends Document {
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    username: string;
    password: string;
    TUPID?: string;
    email?: string;
    contactNumber?: string;
    visitorType: "freshmen applicant" | "job applicant" | "eteeap applicant" | "masteral applicant" | "doctoral applicant" | "tup student" | "parent" | "Guest";
    createdAt: Date;
    updatedAt: Date;
}

const VisitorSchema: Schema = new Schema({
    name: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
    },
    username: { type: String },
    password: { type: String },
    TUPID: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    visitorType: { type: String, enum: ["freshmen applicant", "job applicant", "eteeap applicant", "masteral applicant", "doctoral applicant", "tup student", "parent", "Guest", "Other"], default: "Guest" },
}, { timestamps: true });

VisitorSchema.index({ "name.firstName": 1, "name.middleName": 1, "name.lastName": 1 },
    { unique: true })

// Apply the Philippine timezone plugin
VisitorSchema.plugin(philippineTimePlugin);

export const Visitor = mongoose.model<IVisitor>("Visitor", VisitorSchema);

import mongoose, { Schema, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export interface ITransaction extends Document {
    name: string;        // e.g., Admission, Cashier, OSA
    office: string;      // e.g., Medical Clinic, Department, Cashier
    options?: string[];  // e.g., Window 1, Window 2
}

const TransactionSchema: Schema = new Schema({
    name: { type: String, required: true },
    office: { type: String, required: true },
    options: [{ type: String }],
}, { timestamps: true });

// Apply the Philippine timezone plugin
TransactionSchema.plugin(philippineTimePlugin);

export const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);

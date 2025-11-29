import mongoose, { Schema, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export interface IOffice extends Document {
    name: string;                  // e.g., "Medical Clinic", "Cashier", "OSA"
}

const OfficeSchema: Schema = new Schema({
    name: { type: String, required: true },
}, { timestamps: true });

// Apply the Philippine timezone plugin
OfficeSchema.plugin(philippineTimePlugin);

export const Office = mongoose.model<IOffice>("Office", OfficeSchema);

import mongoose, { Schema, Types, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";
import { College } from "./college.model";
export interface IOffice extends Document {
    name: string;                  // e.g., "Medical Clinic", "Cashier", "OSA"
    collegeId?: Types.ObjectId;
}

const OfficeSchema: Schema = new Schema({
    name: { type: String, required: true },
    collegeId: { type: Schema.Types.ObjectId, ref: "College" }
}, { timestamps: true });

// Apply the Philippine timezone plugin
OfficeSchema.plugin(philippineTimePlugin);

export const Office = mongoose.model<IOffice>("Office", OfficeSchema);

import mongoose, { Schema, Document, Types } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export interface IPosition extends Document {
    departmentId?: Types.ObjectId | null;
    collegeId?: Types.ObjectId | null;
    officeId?: Types.ObjectId | null;
}

const PositionSchema: Schema = new Schema({
    departmentId: { type: Types.ObjectId, },
    collegeId: { type: Types.ObjectId, },
    officeId: { type: Types.ObjectId }
}, { timestamps: true });

// Apply the Philippine timezone plugin
PositionSchema.plugin(philippineTimePlugin);

export const Position = mongoose.model<IPosition>("Position", PositionSchema);

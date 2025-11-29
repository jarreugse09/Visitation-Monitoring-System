import mongoose, { Schema, Document, Types } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";
import { College } from "./college.model";
import { Department } from "./department.model";
import { Office } from "./office.model";
import { User } from "./user.model";



export interface IPosition extends Document {
    departmentId?: Types.ObjectId;
    collegeId?: Types.ObjectId;
    officeId?: Types.ObjectId;
    userId?: Types.ObjectId;
}

const PositionSchema: Schema = new Schema({
    departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
    collegeId: { type: Schema.Types.ObjectId, ref: "College" },
    officeId: { type: Schema.Types.ObjectId, ref: "Office" },
    userId: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

// Apply the Philippine timezone plugin
PositionSchema.plugin(philippineTimePlugin);

export const Position = mongoose.model<IPosition>("Position", PositionSchema);

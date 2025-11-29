import mongoose, { Schema, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export interface IUser extends Document {
    name: string;
    position?: Schema.Types.ObjectId | null; // ref Position
    username: string;
    password: string
    isApprove?: boolean;
    isDeleted?: boolean;
    isSuspend?: boolean;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    position: { type: Schema.Types.ObjectId, ref: "Position", default: null },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    isApprove: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isSuspend: { type: Boolean, default: false },

}, { timestamps: true });

// Apply the Philippine timezone plugin
UserSchema.plugin(philippineTimePlugin);

export const User = mongoose.model<IUser>("User", UserSchema);

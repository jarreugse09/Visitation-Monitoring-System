import mongoose, { Schema, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export interface IUser extends Document {
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    position?: Schema.Types.ObjectId | null;
    username: string;
    password: string;
    isApprove?: boolean;
    isDeleted?: boolean;
    isSuspend?: boolean;
}

const UserSchema: Schema = new Schema(
    {
        name: {
            firstName: { type: String, required: true },
            middleName: { type: String },
            lastName: { type: String, required: true }
        },

        position: { type: Schema.Types.ObjectId, ref: "Position", default: null },

        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        isApprove: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        isSuspend: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Make full name unique
UserSchema.index(
    { "name.firstName": 1, "name.middleName": 1, "name.lastName": 1 },
    { unique: true }
);

// Apply the Philippine timezone plugin
UserSchema.plugin(philippineTimePlugin);

export const User = mongoose.model<IUser>("User", UserSchema);

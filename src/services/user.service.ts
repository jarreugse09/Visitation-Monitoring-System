import { User, IUser } from "../models/user.model";
import { Types } from "mongoose";

class UserService {

    // Get all user (populate position)
    async getAllUser(): Promise<IUser[]> {
        return User.find().populate("position");
    }

    // Get single User by ID
    async getUserById(id: string): Promise<IUser | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return User.findById(id).populate("position");
    }

    // Update User
    async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return User.findByIdAndUpdate(id, data, { new: true }).populate("position");
    }

    // Delete User
    async deleteUser(id: string): Promise<IUser | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return User.findByIdAndDelete(id);
    }
}

export default new UserService();

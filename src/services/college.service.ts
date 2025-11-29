import { College, ICollege } from "../models/college.model";
import { Types } from "mongoose";

class CollegeService {
    // Create a new college
    async createCollege(data: Partial<ICollege>): Promise<ICollege> {
        const college = new College(data);
        return college.save();
    }

    // Get all colleges
    async getAllColleges(): Promise<ICollege[]> {
        return College.find();
    }

    // Get a single college by ID
    async getCollegeById(id: string): Promise<ICollege | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return College.findById(id);
    }

    async getCollegeByName(name: string): Promise<ICollege | null> {
        return College.findOne({ name: name });
    }

    // Update college by ID
    async updateCollege(id: string, data: Partial<ICollege>): Promise<ICollege | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return College.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete college by ID
    async deleteCollege(id: string): Promise<ICollege | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return College.findByIdAndDelete(id);
    }
}

export default new CollegeService();

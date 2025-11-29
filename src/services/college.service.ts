import { College, ICollege } from "../models/college.model";
import { Types } from "mongoose";

class CollegeService {
    // Create a new college
    async createCollege(name: string, departmentIds: Types.ObjectId[]): Promise<ICollege> {
        return await College.create({ name: name, departments: departmentIds });
    }

    // Get all colleges
    async getAllColleges(): Promise<ICollege[]> {
        return await College.find().populate("departments");
    }

    // Get a single college by ID
    async getCollegeById(id: string): Promise<ICollege | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return await College.findById(id);
    }

    async getCollegeByName(name: string): Promise<ICollege | null> {
        return await College.findOne({ name: name });
    }

    // Update college by ID
    async updateCollege(id: string, data: Partial<ICollege>): Promise<ICollege | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return await College.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete college by ID
    async deleteCollege(id: string): Promise<ICollege | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return await College.findByIdAndDelete(id);
    }
}

export default new CollegeService();

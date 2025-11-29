import { Department, IDepartment } from "../models/department.model";
import { Types } from "mongoose";

class DepartmentService {
    // Create a new department
    async createDepartment(name: string): Promise<IDepartment> {
        return await Department.create({ name: name })
    }

    // Get all departments
    async getAllDepartments(): Promise<IDepartment[]> {
        return Department.find();
    }

    // Get single department by ID
    async getDepartmentById(id: string): Promise<IDepartment | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Department.findById(id);
    }
    async getDepartmentByName(name: string): Promise<IDepartment | null> {

        return Department.findOne({ name: name });
    }

    // Update department by ID
    async updateDepartment(id: string, data: Partial<IDepartment>): Promise<IDepartment | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Department.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete department by ID
    async deleteDepartment(id: string): Promise<IDepartment | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Department.findByIdAndDelete(id);
    }
}

export default new DepartmentService();

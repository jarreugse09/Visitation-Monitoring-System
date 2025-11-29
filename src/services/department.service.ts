import { Department, IDepartment } from "../models/department.model";
import { Types } from "mongoose";

class DepartmentService {
    // Create a new department
    async createDepartment(data: Partial<IDepartment>): Promise<IDepartment> {
        const department = new Department(data);
        return department.save();
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

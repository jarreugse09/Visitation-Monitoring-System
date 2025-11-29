import { Office, IOffice } from "../models/office.model";
import { Types } from "mongoose";

class OfficeService {
    // Create new office
    async createOffice(data: Partial<IOffice>): Promise<IOffice> {
        const office = new Office(data);
        return office.save();
    }

    // Get all offices
    async getAllOffices(): Promise<IOffice[]> {
        return Office.find();
    }

    // Get one office by ID
    async getOfficeById(id: string): Promise<IOffice | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Office.findById(id);
    }

    async getOfficeByName(name: string): Promise<IOffice | null> {
        return await Office.findOne({ name: name });
    }


    // Update office
    async updateOffice(id: string, data: Partial<IOffice>): Promise<IOffice | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Office.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete office
    async deleteOffice(id: string): Promise<IOffice | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Office.findByIdAndDelete(id);
    }
}

export default new OfficeService();

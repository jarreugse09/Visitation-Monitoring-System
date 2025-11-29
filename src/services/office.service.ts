import { Office, IOffice } from "../models/office.model";
import { Types } from "mongoose";

class OfficeService {
    // Create new office
    async createOffice(name: string): Promise<IOffice> {

        return await Office.create({ name: name })
    }

    // Get all offices
    async getAllOffices(): Promise<IOffice[]> {
        return await Office.find();
    }

    // Get one office by ID
    async getOfficeById(id: string): Promise<IOffice | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return await Office.findById(id);
    }

    async getOfficeByName(name: string): Promise<IOffice | null> {
        return await Office.findOne({ name: name });
    }


    // Update office
    async updateOffice(id: string, data: Partial<IOffice>): Promise<IOffice | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return await Office.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete office
    async deleteOffice(id: string): Promise<IOffice | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return await Office.findByIdAndDelete(id);
    }
}

export default new OfficeService();

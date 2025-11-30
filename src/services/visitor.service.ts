import { Visitor, IVisitor } from "../models/visitor.model";
import { Types } from "mongoose";

type IName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

class VisitorService {
    // Create a new visitor
    async createVisitor(data: Partial<IVisitor>): Promise<IVisitor> {
        const visitor = new Visitor(data);
        return visitor.save();
    }

    // Get all visitors
    async getAllVisitors(): Promise<IVisitor[]> {
        return Visitor.find();
    }

    // Get single visitor by ID
    async getVisitorById(id: string): Promise<IVisitor | null> {
        return Visitor.findById(id);
    }

    async getVisitorByUsernameAndName(username: string, name: IName): Promise<IVisitor | null> {
        return Visitor.findOne({ username: username, name: name })
    }

    // Update visitor by ID
    async updateVisitor(id: string, data: Partial<IVisitor>): Promise<IVisitor | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Visitor.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete visitor by ID
    async deleteVisitor(id: string): Promise<IVisitor | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Visitor.findByIdAndDelete(id);
    }
}

export default new VisitorService();

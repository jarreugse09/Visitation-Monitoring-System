import { VisitorRecord, IVisitorRecord } from "../models/visitorRecord.model";
import { Types } from "mongoose";

class VisitorRecordService {
    // Create a new visitor record
    async createRecord(data: Partial<IVisitorRecord>) {
        const record = new VisitorRecord(data);
        return record.save();
    }

    // Get all visitor records
    async getAllRecords() {
        return VisitorRecord.find()
            .populate("visitor")
            .populate("transactions.transaction")
            .populate("transactions.handledBy");
    }

    // Get record by ID
    async getRecordById(id: string) {
        if (!Types.ObjectId.isValid(id)) return null;

        return VisitorRecord.findById(id)
            .populate("visitor")
            .populate("transactions.transaction")
            .populate("transactions.handledBy");
    }

    // Add a new transaction inside an existing visitor record
    async addTransaction(recordId: string, transactionData: any) {
        if (!Types.ObjectId.isValid(recordId)) return null;

        return VisitorRecord.findByIdAndUpdate(
            recordId,
            { $push: { transactions: transactionData } },
            { new: true }
        );
    }

    // Update an existing transaction's QR Scan timestamps
    async updateTransactionQR(
        recordId: string,
        transactionIndex: number,
        qrData: any
    ) {
        if (!Types.ObjectId.isValid(recordId)) return null;

        const record = await VisitorRecord.findById(recordId);
        if (!record) return null;

        if (!record.transactions[transactionIndex]) return null;

        // merge qr data
        record.transactions[transactionIndex].qrScans = {
            ...record.transactions[transactionIndex].qrScans,
            ...qrData,
        };

        await record.save();
        return record;
    }

    // Delete a visitor record
    async deleteRecord(id: string) {
        if (!Types.ObjectId.isValid(id)) return null;
        return VisitorRecord.findByIdAndDelete(id);
    }
}

export default new VisitorRecordService();

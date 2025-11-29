import { Transaction, ITransaction } from "../models/transaction.model";
import { Types } from "mongoose";

class TransactionService {
    // Create new transaction
    async createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
        const transaction = new Transaction(data);
        return transaction.save();
    }

    // Get all transactions
    async getAllTransactions(): Promise<ITransaction[]> {
        return Transaction.find();
    }

    // Get one transaction
    async getTransactionById(id: string): Promise<ITransaction | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Transaction.findById(id);
    }

    // Update transaction
    async updateTransaction(id: string, data: Partial<ITransaction>): Promise<ITransaction | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Transaction.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete transaction
    async deleteTransaction(id: string): Promise<ITransaction | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Transaction.findByIdAndDelete(id);
    }
}

export default new TransactionService();

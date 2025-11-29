import mongoose, { Schema, Document } from "mongoose";
import { philippineTimePlugin } from "../plugin/philippineTime.plugin";

export interface ITransactionQR {
    transaction: Schema.Types.ObjectId;   // reference to Transaction
    handledBy?: Schema.Types.ObjectId;    // user who handled the transaction
    qrScans: {
        checkIn?: Date;                     // start of this transaction
        transactionCompleted?: Date;        // completed this transaction
        checkOut?: Date;                    // optional, e.g., final exit QR
    };
    reason?: string;                      // optional reason for this transaction
}

export interface IVisitorRecord extends Document {
    visitor: Schema.Types.ObjectId;       // reference to Visitor
    transactions: ITransactionQR[];       // all transactions including visit confirmation and exit
    createdAt: Date;
    updatedAt: Date;
}

const TransactionQRSchema: Schema = new Schema({
    transaction: { type: Schema.Types.ObjectId, ref: "Transaction", required: true },
    handledBy: { type: Schema.Types.ObjectId, ref: "Faculty" },
    reason: { type: String },
    qrScans: {
        checkIn: { type: Date },
        transactionCompleted: { type: Date },
        checkOut: { type: Date },
    }
}, { _id: false });

const VisitorRecordSchema: Schema = new Schema({
    visitor: { type: Schema.Types.ObjectId, ref: "Visitor", required: true },
    transactions: { type: [TransactionQRSchema], required: true },
}, { timestamps: true });

// Apply the Philippine timezone plugin
VisitorRecordSchema.plugin(philippineTimePlugin);

export const VisitorRecord = mongoose.model<IVisitorRecord>("VisitorRecord", VisitorRecordSchema);

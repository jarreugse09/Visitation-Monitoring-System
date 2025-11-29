import { Request, Response, NextFunction } from "express";
import transactionService from "../services/transaction.service";
import { catchAsync } from "../utils/catchAsync";


export const createTransaction = catchAsync(async (req: Request, res: Response) => {
    const newTransaction = await transactionService.createTransaction(req.body);
    res.status(201).json({
        status: "success",
        data: newTransaction,
    });
});

export const getAllTransactions = catchAsync(async (req: Request, res: Response) => {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json({
        status: "success",
        results: transactions.length,
        data: transactions,
    });
});

export const getTransaction = catchAsync(async (req: Request, res: Response) => {
    const transaction = await transactionService.getTransactionById(req.params.id);

    if (!transaction) {
        return res.status(404).json({ status: "fail", message: "Transaction not found" });
    }

    res.status(200).json({
        status: "success",
        data: transaction,
    });
});

export const updateTransaction = catchAsync(async (req: Request, res: Response) => {
    const transaction = await transactionService.updateTransaction(req.params.id, req.body);

    if (!transaction) {
        return res.status(404).json({ status: "fail", message: "Transaction not found" });
    }

    res.status(200).json({
        status: "success",
        data: transaction,
    });
});

export const deleteTransaction = catchAsync(async (req: Request, res: Response) => {
    const transaction = await transactionService.deleteTransaction(req.params.id);

    if (!transaction) {
        return res.status(404).json({ status: "fail", message: "Transaction not found" });
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

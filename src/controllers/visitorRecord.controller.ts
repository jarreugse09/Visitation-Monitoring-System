import { Request, Response, NextFunction } from "express";
import visitorRecordService from "../services/visitorRecord.service";
import { catchAsync } from "../utils/catchAsync";

export const createRecord = catchAsync(async (req, res) => {
    const record = await visitorRecordService.createRecord(req.body);

    res.status(201).json({
        status: "success",
        data: record,
    });
});

export const getAllRecords = catchAsync(async (req, res) => {
    const records = await visitorRecordService.getAllRecords();

    res.status(200).json({
        status: "success",
        results: records.length,
        data: records,
    });
});

export const getRecord = catchAsync(async (req, res) => {
    const record = await visitorRecordService.getRecordById(req.params.id);

    if (!record) {
        return res.status(404).json({
            status: "fail",
            message: "Visitor record not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: record,
    });
});

export const addTransaction = catchAsync(async (req, res) => {
    const updated = await visitorRecordService.addTransaction(
        req.params.id,
        req.body
    );

    if (!updated) {
        return res.status(404).json({
            status: "fail",
            message: "Visitor record not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: updated,
    });
});

export const updateTransactionQR = catchAsync(async (req, res) => {
    const { index } = req.params; // index of transaction inside array

    const updated = await visitorRecordService.updateTransactionQR(
        req.params.id,
        Number(index),
        req.body
    );

    if (!updated) {
        return res.status(404).json({
            status: "fail",
            message: "Record or transaction not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: updated,
    });
});

export const deleteRecord = catchAsync(async (req, res) => {
    const deleted = await visitorRecordService.deleteRecord(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            status: "fail",
            message: "Visitor record not found",
        });
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

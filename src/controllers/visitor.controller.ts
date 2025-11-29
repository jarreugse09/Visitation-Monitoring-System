import { Request, Response, NextFunction } from "express";
import visitorService from "../services/visitor.service";
import { catchAsync } from "../utils/catchAsync";


export const createVisitor = catchAsync(async (req: Request, res: Response) => {
    const visitor = await visitorService.createVisitor(req.body);

    res.status(201).json({
        status: "success",
        data: visitor,
    });
});

export const getAllVisitors = catchAsync(async (req: Request, res: Response) => {
    const visitors = await visitorService.getAllVisitors();

    res.status(200).json({
        status: "success",
        results: visitors.length,
        data: visitors,
    });
});

export const getVisitor = catchAsync(async (req: Request, res: Response) => {
    const visitor = await visitorService.getVisitorById(req.params.id);

    if (!visitor) {
        return res.status(404).json({
            status: "fail",
            message: "Visitor not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: visitor,
    });
});

export const updateVisitor = catchAsync(async (req: Request, res: Response) => {
    const updatedVisitor = await visitorService.updateVisitor(
        req.params.id,
        req.body
    );

    if (!updatedVisitor) {
        return res.status(404).json({
            status: "fail",
            message: "Visitor not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: updatedVisitor,
    });
});

export const deleteVisitor = catchAsync(async (req: Request, res: Response) => {
    const deletedVisitor = await visitorService.deleteVisitor(req.params.id);

    if (!deletedVisitor) {
        return res.status(404).json({
            status: "fail",
            message: "Visitor not found",
        });
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

import { Request, Response, NextFunction } from "express";
import officeService from "../services/office.service";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export const createOffice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body
    if (!name) return next(new AppError("Invalid empty field", 400));

    const exist = await officeService.getOfficeByName(name.toLowerCase())
    if (exist) return next(new AppError("Office is already exist", 400));

    const office = await officeService.createOffice(name.toLowerCase());
    if (!office) return next(new AppError("Office creation failed", 404));

    res.status(201).json({
        status: "success",
        data: office,
    });
});

export const getAllOffices = catchAsync(async (req: Request, res: Response) => {
    const offices = await officeService.getAllOffices();

    res.status(200).json({
        status: "success",
        results: offices.length,
        data: offices,
    });
});

export const getOffice = catchAsync(async (req: Request, res: Response) => {
    const office = await officeService.getOfficeById(req.params.id);

    if (!office) {
        return res.status(404).json({
            status: "fail",
            message: "Office not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: office,
    });
});

export const updateOffice = catchAsync(async (req: Request, res: Response) => {
    const office = await officeService.updateOffice(req.params.id, req.body);

    if (!office) {
        return res.status(404).json({
            status: "fail",
            message: "Office not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: office,
    });
});

export const deleteOffice = catchAsync(async (req: Request, res: Response) => {
    const office = await officeService.deleteOffice(req.params.id);

    if (!office) {
        return res.status(404).json({
            status: "fail",
            message: "Office not found",
        });
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
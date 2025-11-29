import { Request, Response, NextFunction } from "express";
import collegeService from "../services/college.service";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export const createCollege = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body
    if (!name) return next(new AppError("Invalid empty fields", 400));
    const exist = await collegeService.getCollegeByName(name.toLowerCase());
    if (exist) return next(new AppError("College Name already exist", 400));

    const college = await collegeService.createCollege(name.toLowerCase());
    if (!college) return next(new AppError("College Creation failed", 404));

    res.status(201).json({
        status: "success",
        data: college
    });
});

export const getAllColleges = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const colleges = await collegeService.getAllColleges();
    res.status(200).json({
        status: "success",
        results: colleges.length,
        data: colleges
    });
});

export const getCollege = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const college = await collegeService.getCollegeById(req.params.id);
    if (!college) {
        return res.status(404).json({ status: "fail", message: "College not found" });
    }
    res.status(200).json({ status: "success", data: college });
});

export const updateCollege = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const college = await collegeService.updateCollege(req.params.id, req.body);
    if (!college) {
        return res.status(404).json({ status: "fail", message: "College not found" });
    }
    res.status(200).json({ status: "success", data: college });
});

export const deleteCollege = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const college = await collegeService.deleteCollege(req.params.id);
    if (!college) {
        return res.status(404).json({ status: "fail", message: "College not found" });
    }
    res.status(204).json({ status: "success", data: null });
});

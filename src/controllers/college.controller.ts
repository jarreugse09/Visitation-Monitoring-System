import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import collegeService from "../services/college.service";
import DepartmentService from "../services/department.service";
import type { Types } from "mongoose";

export const createCollege = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, departments } = req.body;

    if (!name || !departments || !Array.isArray(departments) || departments.length === 0) {
        return next(new AppError("College name and departments are required.", 400));
    }

    // Check if college already exists
    const exist = await collegeService.getCollegeByName(name.toLowerCase());
    if (exist) return next(new AppError("College name already exists.", 400));

    // Process departments
    const departmentIds: Types.ObjectId[] = [];
    for (const deptName of departments) {
        let dept = await DepartmentService.getDepartmentByName(deptName.toLowerCase());
        if (!dept) {
            dept = await DepartmentService.createDepartment(deptName.toLowerCase());
        }
        departmentIds.push(dept._id);
    }

    // Create college with department names
    const college = await collegeService.createCollege(name.toLowerCase(), departmentIds);
    if (!college) return next(new AppError("College creation failed.", 500));

    res.status(201).json({
        status: "success",
        data: college,
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

import { Request, Response, NextFunction } from "express";
import departmentService from "../services/department.service";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export const createDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body
    if (!name) return next(new AppError("Invalid empty fields", 400));
    const exist = await departmentService.getDepartmentByName(name.toLowerCase());
    if (exist) return next(new AppError("Department Name already exist", 400));

    const department = await departmentService.createDepartment(name.toLowerCase());
    if (!department) return next(new AppError("Department Creation failed", 404));

    res.status(201).json({
        status: "success",
        data: department
    });
});

export const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
    const departments = await departmentService.getAllDepartments();
    res.status(200).json({
        status: "success",
        results: departments.length,
        data: departments
    });
});

export const getDepartment = catchAsync(async (req: Request, res: Response) => {
    const department = await departmentService.getDepartmentById(req.params.id);
    if (!department) {
        return res.status(404).json({ status: "fail", message: "Department not found" });
    }
    res.status(200).json({ status: "success", data: department });
});

export const updateDepartment = catchAsync(async (req: Request, res: Response) => {
    const department = await departmentService.updateDepartment(req.params.id, req.body);
    if (!department) {
        return res.status(404).json({ status: "fail", message: "Department not found" });
    }
    res.status(200).json({ status: "success", data: department });
});

export const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
    const department = await departmentService.deleteDepartment(req.params.id);
    if (!department) {
        return res.status(404).json({ status: "fail", message: "Department not found" });
    }
    res.status(204).json({ status: "success", data: null });
});

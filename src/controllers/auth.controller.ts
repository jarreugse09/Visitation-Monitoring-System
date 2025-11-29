import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import OfficeService from "../services/office.service";
import { AppError } from "../utils/AppError";
import { IPosition } from "../models/position.model";
import DepartmentService from "../services/department.service";
import collegeService from "../services/college.service";
import PositionService from "../services/position.service";


export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, username, password, office, department, college } = req.body;

    let position: IPosition | null = null;

    // Office-based positions
    const officeNames = ['accounting', 'security', 'uitc', 'irtc', 'ovp', 'human resource', 'registrar', 'library'];

    if (officeNames.includes(office.toLowerCase())) {
        const opis = await OfficeService.getOfficeByName(office);
        if (!opis) return next(new AppError("Office does not exist.", 404));
        position = await PositionService.createPositionforOffice(opis._id);
    }
    // Faculty or Dean positions
    else if (office.toLowerCase() === 'faculty' || office.toLowerCase() === 'dean') {
        if (!department || !college) return next(new AppError("Invalid empty fields.", 400));
        const dept = await DepartmentService.getDepartmentByName(department);
        const col = await collegeService.getCollegeByName(college);
        if (!dept || !col) return next(new AppError("Department or College does not exist.", 404));
        position = await PositionService.createPositionforCollege(dept._id, col._id);
    }
    else {
        return next(new AppError("Invalid office type.", 400));
    }

    if (!position) return next(new AppError("Failed to create position.", 500));

    const { user, token } = await AuthService.signup({
        name,
        username,
        password,
        position, // pass the whole position object
    });

    res.status(201).json({
        status: "success",
        data: { user, token },
    });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const { user, token } = await AuthService.signin({ username, password });
    res.status(200).json({
        status: "success",
        data: { user, token },
    });

})
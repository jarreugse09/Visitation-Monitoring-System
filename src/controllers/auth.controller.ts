import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import { IPosition } from "../models/position.model";
import DepartmentService from "../services/department.service";
import OfficeService from "../services/office.service";
import CollegeService from "../services/college.service";
import PositionService from "../services/position.service";
import VisitorService from "../services/visitor.service";
import { Office } from "../models/office.model";


export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, middleName, lastName, username, password, office, department, college } = req.body;
    let name;
    if (!firstName || !lastName || !username || !password || !office) return next(new AppError("Invalid empty fields", 400));

    !middleName ?
        (name = { firstName: firstName.trim().toLowerCase(), middleName: '', lastName: lastName.trim().toLowerCase() }) :
        (name = { firstName: firstName.trim().toLowerCase(), middleName: middleName.trim().toLowerCase(), lastName: lastName.trim().toLowerCase() });


    let position: IPosition | null = null;

    // Office-based positions
    const officeNames = ['accounting', 'security', 'uitc', 'irtc', 'ovp', 'human resource', 'registrar', 'library'];

    if (officeNames.includes(office.toLowerCase())) {
        const opis = await OfficeService.getOfficeByName(office);
        if (!opis) return next(new AppError("Office does not exist.", 404));
        position = await PositionService.createPositionforOffice(opis._id);
    }
    // Faculty or Dean positions
    else if (office.toLowerCase() === 'faculty') {
        if (!department || !college) return next(new AppError("Invalid empty fields.", 400));
        const dept = await DepartmentService.getDepartmentByName(department);
        const col = await CollegeService.getCollegeByName(college);
        if (!dept || !col) return next(new AppError("Department or College does not exist.", 404));
        position = await PositionService.createPositionforCollege(dept._id, col._id);
    } else if (office.toLowerCase() === 'dean') {
        if (!college) return next(new AppError("Invalid empty fields.", 400));

        const deanName = college.toLowerCase() + ' dean'
        const opis = await OfficeService.getOfficeByName(deanName)
        if (!opis) return next(new AppError("Office does not exist.", 404));

        position = await PositionService.createPositionforCollegeDean(opis._id);
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

    position.userId = user._id;
    await position.save();
    res.status(201).json({
        status: "success",
        data: { user, token },
    });
});

export const visitorSignup = catchAsync(async (req, res, next) => {
    const { firstName, middleName, lastName, username, password, confirmPassword, visitorType, TUPID } = req.body;

    if (!firstName || !lastName || !username || !password || !confirmPassword || !visitorType)
        return next(new AppError("Invalid empty fields", 400));

    if (password !== confirmPassword)
        return next(new AppError("Passwords do not match", 400));

    const name = {
        firstName: firstName.trim().toLowerCase(),
        middleName: middleName ? middleName.trim().toLowerCase() : "",
        lastName: lastName.trim().toLowerCase(),
    };

    if (visitorType.toLowerCase() === "tup student" && !TUPID)
        return next(new AppError("TUP ID should not be empty", 400));

    const userExist = await VisitorService.getVisitorByUsernameAndName(username, name);
    if (userExist) return next(new AppError("User already exists", 400));

    const { user, token } = await AuthService.visitorSignup({
        name,
        username,
        password,
        visitorType,
        TUPID,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
    });

    res.status(201).json({
        status: "success",
        user,
        token,
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
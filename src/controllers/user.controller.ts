import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { catchAsync } from "../utils/catchAsync";



export const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const userList = await UserService.getAllUser();
    res.status(200).json({
        status: "success",
        results: userList.length,
        data: userList,
    });
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({
        status: "success",
        data: user,
    });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.updateUser(req.params.id, req.body);

    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({
        status: "success",
        data: user,
    });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.deleteUser(req.params.id);

    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

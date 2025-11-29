import { Router } from "express";
import {
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

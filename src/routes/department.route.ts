import { Router } from "express";
import { createDepartment, getAllDepartments, getDepartment, updateDepartment, deleteDepartment } from "../controllers/department.controller";

const router = Router();

router.post("/", createDepartment);
router.get("/", getAllDepartments);
router.get("/:id", getDepartment);
router.patch("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;

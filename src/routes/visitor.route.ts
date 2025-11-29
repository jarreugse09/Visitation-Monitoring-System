import { Router } from "express";
import {
    createVisitor,
    getAllVisitors,
    getVisitor,
    updateVisitor,
    deleteVisitor,
} from "../controllers/visitor.controller";

const router = Router();

router.post("/", createVisitor);
router.get("/", getAllVisitors);
router.get("/:id", getVisitor);
router.patch("/:id", updateVisitor);
router.delete("/:id", deleteVisitor);

export default router;

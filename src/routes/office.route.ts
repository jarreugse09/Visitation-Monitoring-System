import { Router } from "express";
import {
    createOffice,
    getAllOffices,
    getOffice,
    updateOffice,
    deleteOffice
} from "../controllers/office.controller";

const router = Router();

router.post("/", createOffice);
router.get("/", getAllOffices);
router.get("/:id", getOffice);
router.patch("/:id", updateOffice);
router.delete("/:id", deleteOffice);

export default router;

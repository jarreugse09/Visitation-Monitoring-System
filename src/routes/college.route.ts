import { Router } from "express";
import { createCollege, getAllColleges, getCollege, updateCollege, deleteCollege } from "../controllers/college.controller";

const router = Router();

router.post("/", createCollege);
router.get("/", getAllColleges);
router.get("/:id", getCollege);
router.patch("/:id", updateCollege);
router.delete("/:id", deleteCollege);

export default router;

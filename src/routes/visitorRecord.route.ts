import { Router } from "express";
import {
    createRecord,
    getAllRecords,
    getRecord,
    addTransaction,
    updateTransactionQR,
    deleteRecord,
} from "../controllers/visitorRecord.controller";

const router = Router();

router.post("/", createRecord);
router.get("/", getAllRecords);
router.get("/:id", getRecord);
router.post("/:id/transactions", addTransaction);
router.patch("/:id/transactions/:index/qr", updateTransactionQR);
router.delete("/:id", deleteRecord);

export default router;

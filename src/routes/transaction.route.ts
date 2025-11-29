
import { Router } from "express";
import {
    createTransaction,
    getAllTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
} from "../controllers/transaction.controller";

const router = Router();

router.post("/", createTransaction);
router.get("/", getAllTransactions);
router.get("/:id", getTransaction);
router.patch("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;

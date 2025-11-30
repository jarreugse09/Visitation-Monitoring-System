import { Router } from "express";
import {
    login, signup
} from "../controllers/auth.controller";

const router = Router();

router.post("/tup/officer/", login);

router.post('/tup/officer/signup', signup)


router.post('/visitor/signup', signup)
router.post("/visitor/", login);
export default router;

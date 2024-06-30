import { Router } from "express";
import { login, logout, register } from "../controllers/auth-controller";

const router = Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/signout", logout);

export default router;

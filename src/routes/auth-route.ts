import { Router } from "express";
import { login, logout, register } from "../controllers/auth-controller";
import { SignupValidator } from "../middlewares/validator";

const router = Router();

router.post("/signup", SignupValidator, register);
router.post("/signin", login);
router.post("/signout", logout);

export default router;

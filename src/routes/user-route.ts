import { Router } from "express";
import { getUserInfo } from "../controllers/user-controller";

import { verifyTokenAndAuthorization } from "../middlewares/verify-token";

const router = Router();

router.get("/acct_info", verifyTokenAndAuthorization, getUserInfo);

export default router;

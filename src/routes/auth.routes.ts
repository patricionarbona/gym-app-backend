import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/authJwt";

const router = Router();

router.post("/signup", authCtrl.signup);

router.post("/signin",verifyToken, authCtrl.signin);

export default router;

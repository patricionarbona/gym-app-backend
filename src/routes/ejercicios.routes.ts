import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import { addEjercicio } from "../controllers/ejercicios.controller";

const router = Router();

router.post("/", verifyToken, addEjercicio); //TODO: add role

export default router;
import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import { addEjercicio, getEjercicios } from "../controllers/ejercicios.controller";

const router = Router();

router.post("/", verifyToken, addEjercicio); //TODO: add role
router.get("/", getEjercicios);

export default router;
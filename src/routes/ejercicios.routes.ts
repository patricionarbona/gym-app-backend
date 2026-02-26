import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import {
  addEjercicio,
  getEjercicio,
  getEjercicios,
} from "../controllers/ejercicios.controller";

const router = Router();

router.post("/", verifyToken, addEjercicio); //TODO: add role
router.get("/", getEjercicios);
router.get("/:id", getEjercicio);

export default router;

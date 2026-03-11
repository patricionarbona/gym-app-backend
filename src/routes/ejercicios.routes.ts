import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import {
  addEjercicio,
  deleteEjercicio,
  getExerciseAllProgress,
  getEjercicio,
  getEjercicios,
  saveEjercicioProgress,
} from "../controllers/ejercicios.controller";

const router = Router();

router.post("/", verifyToken, addEjercicio); //TODO: add role
router.get("/", getEjercicios);
router.get("/:id", getEjercicio);
router.delete("/:id", deleteEjercicio);

router.get("/:id/progress", verifyToken, getExerciseAllProgress);
// router.get('/:id/progress/last')
// router.get('/:id/progress/max')
router.post("/:id/progress", verifyToken, saveEjercicioProgress); //TODO: add role

export default router;

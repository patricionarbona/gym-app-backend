import { Request, Response } from "express";
import { CreateEjercicioParams, SaveEjercicioProgress } from "../interfaces";
import {
  createEjercicio,
  getEjercicioById,
  getEjerciciosDB,
  deleteEjercicioDB,
  saveEjercicioProgressDB,
  getExerciseAllProgressDB,
  getExerciseMaxProgressDB,
} from "../services/database.service";

export const addEjercicio = async (req: Request, res: Response) => {
  const newEjercicio: CreateEjercicioParams = req.body;
  const result = await createEjercicio(newEjercicio);
  if (!result.ok) {
    res.status(400).json({ message: result.message });
  }
  return res.status(201).json({ message: result.message });
};

export const getEjercicios = async (req: Request, res: Response) => {
  const result = await getEjerciciosDB();
  if (!result.ok) {
    return res.status(400).json({ message: result.message });
  } else {
    return res.status(200).json({ result: result.result });
  }
};

export const getEjercicio = async (req: Request, res: Response) => {
  const idEjercicio = req.params?.id;
  const result = await getEjercicioById(Number(idEjercicio));
  if (!result.ok) {
    return res.status(400).json({ message: result.result });
  } else {
    return res.status(200).json({ result: result.result });
  }
};

export const deleteEjercicio = async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await deleteEjercicioDB(Number(id));
  if (!result.ok) {
    return res.status(400).json({ message: result.result });
  } else {
    return res.status(204).send();
  }
};

export const saveEjercicioProgress = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const ejercicioId = req.params?.id;

  if (!userId) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const newEjercicio: SaveEjercicioProgress = {
    ...req.body,
    idEjercicio: ejercicioId,
    idUsuario: userId,
  };
  const result = await saveEjercicioProgressDB(newEjercicio);
  if (!result.ok) {
    res.status(400).json({ message: result.result });
  }
  return res.status(204).send();
};

export const getExerciseAllProgress = async (req: Request, res: Response) => {
  const idExercise = req.user?.id;
  if (!idExercise) {
    return res.status(400).json({ message: "No se ha recibido el ejercicio" });
  }
  const result = await getExerciseAllProgressDB(idExercise);
  if (!result.ok) {
    res.status(400).json({ message: result.result });
  }
  return res.status(200).json({ message: result.result });
};

export const getExerciseMaxProgress = async (req: Request, res: Response) => {
  const idExercise = req.user?.id;
  if (!idExercise) {
    return res.status(400).json({ message: "No se ha recibido el ejercicio" });
  }
  const result = await getExerciseMaxProgressDB(idExercise);
  if (!result.ok) {
    res.status(400).json({ message: result.result });
  }
  return res.status(200).json({ message: result.result });
};

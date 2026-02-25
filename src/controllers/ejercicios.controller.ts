import { Request, Response } from "express";
import { CreateEjercicioParams } from "../interfaces";
import { createEjercicio } from "../services/database.service";

export const addEjercicio = async (req: Request, res: Response) => {
  const newEjercicio: CreateEjercicioParams = req.body;
  const result = await createEjercicio(newEjercicio);
  if (!result.ok) {
    res.status(400).json({ message: result.message });
  }
  return res.status(201).json({ message: result.message });
};

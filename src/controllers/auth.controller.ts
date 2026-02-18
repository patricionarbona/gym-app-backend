import { Request, Response } from "express";
import { CreateUserParams } from "../interfaces";
import { createUserDB } from "./database.controller";
import jwt from "jsonwebtoken";



export const signup = async (req: Request, res: Response) => {
  const newUserData: CreateUserParams = req.body;
  //TODO: change type of result
  const result = await createUserDB(newUserData);
  const token = jwt.sign({ id: result }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.json(token);
};

export const signin = async (req: Request, res: Response) => {
  res.json("signin");
};
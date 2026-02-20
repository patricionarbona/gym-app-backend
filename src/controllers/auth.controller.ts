import { Request, Response } from "express";
import { CreateUserParams } from "../interfaces";
import { createUserDB } from "../services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'


export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const comparePassword = async (password: string, receivedPassword: string) => {
  return await bcrypt.compare(password, receivedPassword)
}

export const signup = async (req: Request, res: Response) => {
  const newUserData: CreateUserParams = req.body;
  const result = await createUserDB(newUserData);
  if(result.success) {
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  
    return res.json({token: token});
  }
  
  if(result.errorCode === "ER_DUP_ENTRY") {
    return res.status(409).json({error: "Correo ya registrado"})
  }
  return res.status(400).json({error: result.errorCode})
};

export const signin = async (req: Request, res: Response) => {
  res.json("signin");
};
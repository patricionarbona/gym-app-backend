import { Request, Response } from "express";
import { CreateUserParams } from "../interfaces";
import { createUserDB } from "./database.controller";


export const signup = async (req: Request, res: Response) => {
    const newUserData:CreateUserParams = req.body
    createUserDB(newUserData)
    res.json("signup")
};

export const signin = async (req: Request, res: Response) => {
    res.json("signin")
};
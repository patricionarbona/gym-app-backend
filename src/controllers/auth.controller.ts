import { Request, Response } from "express";

interface loginRequest {
    email: string,
    username: string,
    password: string
}

export const signup = async (req: Request, res: Response) => {
    const newUserData:loginRequest = req.body
    
    res.json("signup")
};

export const signin = async (req: Request, res: Response) => {
    res.json("signin")
};
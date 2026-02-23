import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserAuthInfoRequest } from "../interfaces";
import { foundUserById } from "../services/database.service";

//*Token simple para verificar la id existe
export const verifyToken = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;


  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await foundUserById(decoded.id as number)
    if(!user) {
      return res.status(404).json({ message: "No user found"})
    }
    req.user = {
      id: decoded.id as number,
      iat: decoded.iat as number,
      exp: decoded.exp as number,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

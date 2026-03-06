import "express";

declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      iat: number;
      exp: number;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
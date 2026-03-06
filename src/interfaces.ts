import { Request } from "express";
import { RowDataPacket } from "mysql2";
export interface UserAuthInfoRequest extends Request {
  user?: {
    id: number;
    iat: number;
    exp: number;
  };
}

export interface UserParams {
  usuario: string;
  correo: string;
  password: string;

  admin?: boolean;
  created_at?: string;
  updated_at?: string;
  last_active_at?: string | null;
  deleted_at?: string | null;
}

export type CreateUserParams = Omit<
  UserParams,
  "created_at" | "updated_at" | "last_active_at" | "deleted_at"
>;

export type CreateUserResult =
  | { success: true; insertId: number; errorCode?: never }
  | { success: false; errorCode: string; insertId?: never };

//* DB TYPES
export interface UserDB extends RowDataPacket {
  id: number;
  usuario: string;
  correo: string;
  password: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
  last_active_at: string;
  deleted_at: string;
}

export type EjercicioDB = {
  id: number;
  nombre: string;
  musculo_general: string;
  musculo_principal: string;
  musculo_secundario: string;
};
export type RegistroEjerciciosDB = {
  id: number;
  idEjercicio: number;
  idUsuario: number;
  idEntrenoEjercicios?: number;
  peso: number;
  reps: number;
  notas: string;
  fecha: string;
};

export type CreateEjercicioParams = Omit<EjercicioDB, "id">;

export type CreateEjercicioResult =
  | { ok: true; message: string; id: number }
  | { ok: false; message: string };

export type GetEjerciciosResult =
  | { ok: true; result: EjercicioDB[] }
  | { ok: false; message: string };

export type SaveEjercicioProgress = Omit<RegistroEjerciciosDB, "id" | "fecha">;
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../database";
import {
  CreateEjercicioParams,
  CreateEjercicioResult,
  EjercicioDB,
  GetEjerciciosResult,
  UserDB,
} from "../interfaces";

export const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    console.log("✅ DB Connected:", rows);
  } catch (err: any) {
    console.error("❌ DB Error:", err.message);
  }
};

export const foundUserById = async (id: number): Promise<UserDB | null> => {
  try {
    const query = "SELECT * FROM usuarios WHERE id = ?";
    const [rows] = await pool.execute<UserDB[]>(query, [id]);
    console.log(rows);
    return rows.length ? rows[0] : null;
  } catch (err: any) {
    console.log("DB Error:", err.message);
    return null;
  }
};

export const createEjercicio = async (
  data: CreateEjercicioParams,
): Promise<CreateEjercicioResult> => {
  try {
    const { nombre, musculo_general, musculo_principal, musculo_secundario } =
      data;

    const sqlQuery = `
      INSERT INTO ejercicios (nombre, musculo_general, musculo_principal, musculo_secundario) 
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute<ResultSetHeader>(sqlQuery, [
      nombre,
      musculo_general,
      musculo_principal ?? "",
      musculo_secundario ?? "",
    ]);

    if (result.affectedRows === 0) {
      return {
        ok: false,
        message: "No se pudo insertar el ejercicio",
      };
    }

    return {
      ok: true,
      message: "Ejercicio insertado correctamente",
      id: result.insertId,
    };
  } catch (err: any) {
    return {
      ok: false,
      message: `Error al insertar el ejercicio: ${err.message}`,
    };
  }
};

export const getEjercicios = async (): Promise<GetEjerciciosResult> => {
  try {
    const query = "SELECT * FROM ejercicios";
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return { ok: true, result: rows as EjercicioDB[] };
  } catch (err: any) {
    return {
      ok: false,
      message: `Error obteniendo los ejercicios ${err.message}`,
    };
  }
};

export const getEjercicioById = async (
  id: number,
): Promise<{ ok: boolean; result: EjercicioDB | string }> => {
  try {
    const query = "SELECT * FROM ejercicios WHERE id = ?;";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return { ok: true, result: rows[0] as EjercicioDB };
  } catch (err: any) {
    return {
      ok: false,
      result: `Error obteniendo el ejercicio: ${err.message}`,
    };
  }
};

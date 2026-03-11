import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../database";
import {
  CreateEjercicioParams,
  CreateEjercicioResult,
  EjercicioDB,
  GetEjerciciosResult,
  SaveEjercicioProgress,
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

export const getEjerciciosDB = async (): Promise<GetEjerciciosResult> => {
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

export const deleteEjercicioDB = async (id: number) => {
  try {
    const query = "DELETE FROM ejercicios WHERE id = ?";
    const [rows] = await pool.execute<ResultSetHeader>(query, [id]);
    if (rows.affectedRows === 0) {
      throw Error("No existe el ejercicio");
    }
    return { ok: true, result: rows.info };
  } catch (err: any) {
    return {
      ok: false,
      result: `Error eliminando el ejercicio: ${err.message}`,
    };
  }
};

export const saveEjercicioProgressDB = async (data: SaveEjercicioProgress) => {
  try {
    const query =
      "INSERT INTO registro_ejercicios (idEjercicio, idUsuario, peso, reps, notas) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await pool.execute<ResultSetHeader>(query, [
      data.idEjercicio,
      data.idUsuario,
      data.peso,
      data.reps,
      data.notas ?? "",
    ]);
    if (rows.affectedRows === 0) {
      throw Error("No se pudo guardar el progreso");
    }
    return { ok: true, result: "Progreso guardado" };
  } catch (err: any) {
    return {
      ok: false,
      result: `Error guardando el progreso: ${err.message}`,
    };
  }
};

export const getExerciseAllProgressDB = async (id: string | number) => {
  try {
    const query =
      "SELECT * FROM registro_ejercicios WHERE idUsuario = ? ORDER BY fecha";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return { ok: true, result: rows };
  } catch (err: any) {
    return {
      ok: false,
      result: `Error obteniendo el progreso: ${err.message}`,
    };
  }
};

export const getExerciseMaxProgressDB = async (id: string | number) => {
  try {
    const query =
      "SELECT * FROM registro_ejercicios WHERE idUsuario = ?  ORDER BY peso DESC, fecha DESC LIMIT 1";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return { ok: true, result: rows };
  } catch (err: any) {
    return {
      ok: false,
      result: `Error obteniendo el progreso máximo: ${err.message}`,
    };
  }
};

export const getExerciseLastProgressDB = async (id: string | number) => {
  try {
    const query =
      "SELECT * FROM registro_ejercicios WHERE idUsuario = ?  ORDER BY fecha DESC LIMIT 1";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return { ok: true, result: rows };
  } catch (err: any) {
    return {
      ok: false,
      result: `Error obteniendo el último progreso: ${err.message}`,
    };
  }
};

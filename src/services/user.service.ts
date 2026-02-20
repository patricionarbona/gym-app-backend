import { pool } from "../database";
import { CreateUserParams, CreateUserResult } from "../interfaces";
import { ResultSetHeader } from "mysql2";
import { encryptPassword } from "../controllers/auth.controller";

export const createUserDB = async (
  userData: CreateUserParams,
): Promise<CreateUserResult> => {
  try {
    const newPassword = await encryptPassword(userData.password);
    const query =
      "INSERT INTO usuarios (usuario, correo, password, admin) VALUES (?, ?, ?, ?)";
    const [results] = await pool.execute<ResultSetHeader>(query, [
      userData.usuario,
      userData.correo,
      newPassword,
      userData?.admin || false,
    ]);
    console.log(`✅ User ${userData.correo} added`);
    return {
      success: true,
      insertId: results.insertId,
    };
  } catch (err: any) {
    console.error("❌ Error adding user:", err.message);
    return {
      success: false,
      errorCode: err.code,
    };
  }
};

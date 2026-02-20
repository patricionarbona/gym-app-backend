import { ResultSetHeader } from "mysql2";
import { pool } from "../database";
import { CreateUserParams } from "../interfaces";
import { encryptPassword } from "./auth.controller";

export const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    console.log("✅ DB Connected:", rows);
  } catch (err: any) {
    console.error("❌ DB Error:", err.message);
  }
};

export const createUserDB = async (userData: CreateUserParams) => {
  try {
    const newPassword = await encryptPassword(userData.password)
    const query = 'INSERT INTO usuarios (usuario, correo, password, admin) VALUES (?, ?, ?, ?)' 
    const [results] = await pool.execute<ResultSetHeader>(
      query,
      [userData.usuario, userData.correo, newPassword, userData?.admin || false ]
    )
    console.log("✅ User added:", results);
    return results.insertId
  } catch (err: any) {
    console.error("❌ Error adding user:", err.message);
  }
}
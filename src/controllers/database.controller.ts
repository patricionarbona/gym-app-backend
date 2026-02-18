import { pool } from "../database";
import { CreateUserParams } from "../interfaces";

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
    const query = 'INSERT INTO usuarios (usuario, correo, password, admin) VALUES (?, ?, ?, ?)' 
    const [results] = await pool.execute(
      query,
      [userData.usuario, userData.correo, userData.password, userData?.admin || false ]
    )
    console.log("✅ User added:", results);
  } catch (err: any) {
    console.error("❌ Error adding user:", err.message);
  }
}
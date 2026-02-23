import { pool } from "../database";
import { UserDB } from "../interfaces";


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
    const query = 'SELECT * FROM usuarios WHERE id = ?'
    const [rows] = await pool.execute<UserDB[]>(query, [id])
    console.log(rows)
    return rows.length ? rows[0] : null
  } catch( err: any) {
    console.log("DB Error:", err.message)
    return null
  }
}
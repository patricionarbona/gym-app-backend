import { pool } from "../database";
import { CreateUserParams } from "../interfaces";
import bcrypt from 'bcryptjs'

export const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    console.log("✅ DB Connected:", rows);
  } catch (err: any) {
    console.error("❌ DB Error:", err.message);
  }
};


//* TODO: Move to other file encrypt & compare
const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const comparePassword = async (password: string, receivedPassword: string) => {
  return await bcrypt.compare(password, receivedPassword)
}

export const createUserDB = async (userData: CreateUserParams) => {
  try {
    const newPassword = await encryptPassword(userData.password)
    const query = 'INSERT INTO usuarios (usuario, correo, password, admin) VALUES (?, ?, ?, ?)' 
    const [results] = await pool.execute(
      query,
      [userData.usuario, userData.correo, newPassword, userData?.admin || false ]
    )
    console.log("✅ User added:", results);
  } catch (err: any) {
    console.error("❌ Error adding user:", err.message);
  }
}
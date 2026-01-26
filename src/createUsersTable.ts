import "dotenv/config";
import { connect } from "./dbConnection";

async function main() {
  const conn = await connect();

  const sql = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(100) NOT NULL,
      correo VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      admin BOOLEAN DEFAULT FALSE,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      last_active_at DATETIME NULL,
      deleted_at DATETIME NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await conn.execute(sql);
  await conn.end();

  console.log("✅ Tabla usuarios creada (o ya existía).");
}

main().catch((err) => {
  console.error("❌ Error creating table usuarios:", err);
  process.exit(1);
});

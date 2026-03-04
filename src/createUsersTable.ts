import "dotenv/config";
import { pool } from "./database";

async function main() {
  const sqlUsuarios = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
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

  const sqlEjercicios = `
    CREATE TABLE IF NOT EXISTS ejercicios (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL UNIQUE,
      musculo_general VARCHAR(100) NOT NULL,
      musculo_principal VARCHAR(100) NOT NULL,
      musculo_secundario VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  const sqlRegistroEjercicios = `
    CREATE TABLE IF NOT EXISTS registro_ejercicios (
     id INT PRIMARY KEY AUTO_INCREMENT,
     idEjercicio INT UNSIGNED NOT NULL,
     idUsuario INT NOT NULL,
     idEntrenoEjercicios INT NOT NULL,
     peso DECIMAL(5,2) NOT NULL,
     reps INT NOT NULL,
     notas TEXT,
     fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (idEjercicio) REFERENCES ejercicios(id),
     FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await pool.execute(sqlUsuarios);
  await pool.execute(sqlEjercicios);
  await pool.end();

  console.log("✅ Tabla usuarios creada (o ya existía).");
}

main().catch((err) => {
  console.error("❌ Error creating table usuarios:", err);
  process.exit(1);
});

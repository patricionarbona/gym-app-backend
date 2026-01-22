import "dotenv/config";
import { connect } from "./dbConnection";

async function main() {
  const conn = await connect();
  console.log("✅ Connection established");

  const [rows] = await conn.query("SELECT 1 AS ok");
  console.log("🏓 Ping:", rows);

  await conn.end();
  console.log("🔌 Connection closed");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});

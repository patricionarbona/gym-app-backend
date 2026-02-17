import 'dotenv/config'
import app from "./app";
import { testConnection } from './controllers/database.controller';

const startServer = async () => {
  await testConnection();

  app.set("port", 3000);

  app.listen(3000, () => {
    console.log(`🚀 Server running on port ${app.get("port")}`);
  });
};

startServer();

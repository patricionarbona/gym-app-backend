import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";
import loginRoute from "./routes/login";
import authRoutes from './routes/auth.routes'

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(loginRoute);

app.post("/isAlive", (req: Request, res: Response) => {
  console.log("Server is alive");
  res.send("Server is alive");
});

app.use('/api/auth', authRoutes)

export default app;

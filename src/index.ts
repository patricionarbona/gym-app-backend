import express from "express";
import loginRoute from "./routes/login"
import { Request, Response } from "express";
const app = express();

app.set("port", 3000);

app.use(loginRoute)

app.post("/isAlive", (req: Request, res: Response) => {
    console.log("Server is alive");
    res.send("Server is alive");
});

app.listen(3000);
console.log(`Server on port ${app.get("port")}`);

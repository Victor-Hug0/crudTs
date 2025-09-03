import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import UserRoutes from "./routes/UserRoutes.js";

dotenv.config()

const app = express();
const userRoutes = new UserRoutes()

app.use(express.json());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.use("/api/users", userRoutes.router)

app.listen(Number(PORT), HOST, () => {
    console.log(`Server running in http://${HOST}:${PORT}`)
});

app.get("/", (req: Request, res:Response) => {
    res.send("Hello World!")
})
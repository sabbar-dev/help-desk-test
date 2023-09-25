import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import userRoutes from "./src/routes/userRoutes";
import ticketRoutes from "./src/routes/ticketRoutes";

const prisma = new PrismaClient();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/user", userRoutes);
app.use("/ticket", ticketRoutes);

app.get("/", async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();
  console.log("users", allUsers);
  res.send(`Users`);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");
dotenv.config();
import userRoutes from "./src/routes/userRoutes";
import ticketRoutes from "./src/routes/ticketRoutes";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/ticket", ticketRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.send(`welcome`);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

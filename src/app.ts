import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
const port = 3000;

// parser
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to hotel management server ");
});

export default app;

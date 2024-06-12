// app.ts

import express, { Application, Request, Response } from "express";
import cors from "cors";
import UserRouter from "./app/config/modules/usersmodules/user.routes";
 

const app: Application = express();
const port = process.env.PORT || 3000;

// parser
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', UserRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to hotel management server");
});

export default app;

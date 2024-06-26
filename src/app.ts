// app.ts

import express, { Application, Request, Response } from "express";
import cors from "cors";
import UserRouter from "./app/config/modules/usersmodules/user.routes";
import RoomRouter from "./app/config/modules/roomsmodules/room.routes";
import notFoundHandler from "./middlewares/notFound.middleware";
import errorHandler from "./middlewares/error.middleware";
import SlotRouter from "./app/config/modules/slotmodules/slot.routes";
import BookingRouter from "./app/config/modules/bookingmodules/booking.routes";
 

const app: Application = express();
const port = process.env.PORT || 3000;

// parser
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', UserRouter);
app.use('/api', RoomRouter);
app.use('/api', SlotRouter);
app.use('/api', BookingRouter);


// Error Handler
app.use(notFoundHandler);
app.use(errorHandler);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to hotel management server");
});

export default app;

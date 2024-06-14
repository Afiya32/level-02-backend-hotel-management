import express from "express";
import { RoomController } from "./room.controller";

import { roomSchema } from "./room.validation";


import { authenticateAdmin } from "../../auth.middleware";
import validate from "../../../../middlewares/validate.middleware";

const RoomRouter = express.Router();

// Routes
RoomRouter.post("/rooms", authenticateAdmin, validate(roomSchema), RoomController.createRoom);
RoomRouter.get("/rooms/:id", RoomController.getRoom);
RoomRouter.get("/rooms", RoomController.getAllRooms);
RoomRouter.put("/rooms/:id", authenticateAdmin, validate(roomSchema), RoomController.updateRoom);
RoomRouter.delete("/rooms/:id", authenticateAdmin, RoomController.deleteRoom);

export default RoomRouter;

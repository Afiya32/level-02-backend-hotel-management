import { Request, Response, NextFunction } from "express";
import { RoomServices } from "./room.services";



// create room
const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const room = req.body;
    const result = await RoomServices.createRoomDB(room);
    res.status(200).json({
      success: true,
      message: 'Room added successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// get single room
const getRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const room = await RoomServices.getRoomById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: []
      });
    }
    res.status(200).json({
      success: true,
      message: 'Room retrieved successfully',
      data: room,
    });
  } catch (error) {
    next(error);
  }
};
// get all room
const getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await RoomServices.getAllRooms();
    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: []
      });
    }
    res.status(200).json({
      success: true,
      message: 'Rooms retrieved successfully',
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};
// update room 
const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const room = await RoomServices.updateRoom(req.params.id, req.body);
    if (!room) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: []
      });
    }
    res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

// delete room
const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const room = await RoomServices.deleteRoom(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: []
      });
    }
    res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const RoomController = {
  createRoom,
  getRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
};

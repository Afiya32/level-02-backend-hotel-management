import { Request, Response } from "express";
import { RoomServices } from "./room.services";


const createRoom = async (req: Request, res: Response) => {
  try {
    const room = req.body;
    const result = await RoomServices.createRoomDB(room);
    res.status(200).json({
      success: true,
      message: 'Room added successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await RoomServices.getRoomById(id);
    res.status(200).json({
      success: true,
      message: 'Room retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllRooms = async (req: Request, res: Response) => {
  try {
    const result = await RoomServices.getAllRooms();
    res.status(200).json({
      success: true,
      message: 'Rooms retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await RoomServices.updateRoom(id, updatedData);
    res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await RoomServices.deleteRoom(id);
    res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const RoomController = {
  createRoom,
  getRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
};

import { Room } from "./room.interface";
import { RoomModel } from "./room.model";

const createRoomDB = async (room: Room) => {
  const result = await RoomModel.create(room);
  return result;
};

const getRoomById = async (id: string) => {
  const result = await RoomModel.findById(id);
  return result;
};

const getAllRooms = async () => {
  const result = await RoomModel.find({ isDeleted: false });
  return result;
};

const updateRoom = async (id: string, updatedData: Partial<Room>) => {
  const result = await RoomModel.findByIdAndUpdate(id, updatedData, { new: true });
  return result;
};

const deleteRoom = async (id: string) => {
  const result = await RoomModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const RoomServices = {
  createRoomDB,
  getRoomById,
  getAllRooms,
  updateRoom,
  deleteRoom,
};

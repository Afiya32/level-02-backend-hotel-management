import { Room } from "./room.interface";
import { RoomModel } from "./room.model";

// create room
const createRoomDB = async (room: Room) => {
  const result = await RoomModel.create(room);
  return result;
};
// get single room
const getRoomById = async (id: string) => {
  const result = await RoomModel.findById(id);
  return result;
};

// get all room
const getAllRooms = async () => {
  const result = await RoomModel.find({ isDeleted: false });
  return result;
};


// update room 
const updateRoom = async (id: string, updatedData: Partial<Room>) => {
  const result = await RoomModel.findByIdAndUpdate(id, updatedData, { new: true });
  return result;
};


// delete room
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

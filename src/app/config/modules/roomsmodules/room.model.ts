// room model

import { Schema, model } from 'mongoose';
import { Room } from './room.interface';

const roomSchema = new Schema<Room>({
    name: { type: String, required: true },
    roomNo: { type: Number, required: true, unique: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: [{ type: String, required: true }],
    isDeleted: { type: Boolean, default: false },
});

export const RoomModel = model<Room>('Room', roomSchema);

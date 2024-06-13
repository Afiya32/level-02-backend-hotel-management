import mongoose, { Schema, Document, Types } from 'mongoose';
import { Slot } from './slot.interface';

const slotSchema: Schema = new Schema({
    room: { type: Types.ObjectId, ref: 'Room', required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false }
});

export default mongoose.model<Slot & Document>('Slot', slotSchema);

import { Schema, model } from 'mongoose';
import { Booking } from './booking.inerface';


const BookingSchema = new Schema<Booking>({
    room: { type: Schema.Types.ObjectId as any, ref: 'Room', required: true },
    slots: [{ type: Schema.Types.ObjectId as any, ref: 'Slot', required: true }],
    user: { type: Schema.Types.ObjectId as any, ref: 'User', required: true },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: { type: String, enum: ['unconfirmed', 'confirmed', 'canceled'], default: 'unconfirmed' },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

export default model<Booking>('Booking', BookingSchema);

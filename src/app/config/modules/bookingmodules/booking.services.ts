// booking services

import { Booking } from './booking.inerface';
import BookingModel from './booking.model';


export const createBookingService = async (bookingData: Booking) => {
    const booking = new BookingModel(bookingData);
    await booking.save();
    return booking;
};

export const getAllBookingsService = async () => {
    return await BookingModel.find().populate('room').populate('slots').populate('user');
};

export const getUserBookingsService = async (userId: string) => {
    return await BookingModel.find({ user: userId }).populate('room').populate('slots').populate('user');
};

export const updateBookingService = async (bookingId: string, updates: Partial<Booking>) => {
    return await BookingModel.findByIdAndUpdate(bookingId, updates, { new: true });
};

export const deleteBookingService = async (bookingId: string) => {
    return await BookingModel.findByIdAndUpdate(bookingId, { isDeleted: true }, { new: true });
};


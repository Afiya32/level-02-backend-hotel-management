// booking services

import { Booking } from './booking.inerface';
import BookingModel from './booking.model';

// create booking
 const createBookingService = async (bookingData: Booking) => {
   try {
    const booking = new BookingModel(bookingData);
    await booking.save();
    return booking;
    
   } catch (error) {
    throw(error)
   }
};

// get all booking
 const getAllBookingsService = async () => {
    try {
        return await BookingModel.find().populate('room').populate('slots').populate('user');
    } catch (error) {
        throw(error)
    }
};

// get user booking 
 const getUserBookingsService = async (userId: string) => {
    try {
        return await BookingModel.find({ user: userId }).populate('room').populate('slots').populate('user');
    } catch (error) {
        throw(error)
    }
};

// update booking
const updateBookingService = async (bookingId: string, updates: Partial<Booking>) => {
   try {
    return await BookingModel.findByIdAndUpdate(bookingId, updates, { new: true });
   } catch (error) {
    throw(error)
   }
};

// update booking
 const deleteBookingService = async (bookingId: string) => {
   try {
    return await BookingModel.findByIdAndUpdate(bookingId, { isDeleted: true }, { new: true });
   } catch (error) {
    throw(error)
    
   }
};

export const bookingServices={
    deleteBookingService,
    updateBookingService,
    getUserBookingsService,
    getAllBookingsService,
    createBookingService

}
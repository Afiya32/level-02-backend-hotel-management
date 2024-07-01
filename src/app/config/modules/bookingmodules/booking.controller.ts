// booking controller

import { Request, Response, NextFunction } from 'express';
import BookingModel from './booking.model';
import { RoomModel } from '../roomsmodules/room.model';
import slotModel from '../slotmodules/slot.model';
import { Booking } from './booking.inerface';
import mongoose from 'mongoose';

// Create booking
const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, slots, room, user } = req.body;

        console.log("Creating booking for:", { date, slots, room, user });

        // Validate the room, slots, and user existence
        const roomExists = await RoomModel.findById(room);
        if (!roomExists) return res.status(404).json({ success: false, message: 'Room not found' });

        const slotDocuments = await slotModel.find({ _id: { $in: slots }, room, date });
        if (slotDocuments.length !== slots.length) return res.status(404).json({ success: false, message: 'Some slots not found or invalid' });

        let totalAmount = 0;
        slotDocuments.forEach(slot => {
            totalAmount += roomExists.pricePerSlot;
            slot.isBooked = true;
            slot.save();
        });

        const bookingData: Partial<Booking> = {
            room,
            slots,
            user,
            date,
            totalAmount,
            isConfirmed: 'unconfirmed',
            isDeleted: false,
        };

        const newBooking = await BookingModel.create(bookingData);

        res.status(200).json({
            success: true,
            message: 'Booking created successfully',
            data: newBooking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        next(error);
    }
};

// get all booking
const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Fetching all bookings");
        const bookings = await BookingModel.find().populate('room').populate('slots').populate('user');
        res.status(200).json({
            success: true,
            message: 'All bookings retrieved successfully',
            data: bookings
        });
    } catch (error) {
        console.error("Error fetching all bookings:", error);
        next(error);
    }
};

// get user booking 
const getUserBookings = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any)._id;
    try {
        
        console.log(`Fetching bookings for user: ${userId}`);
        const bookings = await BookingModel.find({ user: userId }).populate('room').populate('slots').populate('user');
        res.status(200).json({
            success: true,
            message: 'User bookings retrieved successfully',
            data: bookings
        });
    } catch (error) {
        console.error(`Error fetching bookings for user ${userId}:`, error);
        next(error);
    }
};

// update booking
const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id; 

    try {
        const updates = req.body;

        if (!bookingId) {
            return res.status(400).json({ success: false, message: 'Booking ID is required.' });
        }

        console.log(`Updating booking ${bookingId} with data:`, updates);

        // Validate the booking ID
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ success: false, message: 'Invalid booking ID.' });
        }

        // Validate the updates object (add more validations as needed)
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: 'No updates provided.' });
        }

        const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, updates, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        console.error(`Error updating booking ${bookingId}:`, error);
        next(error);
    }
};

// delete booking
const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id;
    try {
        
        console.log(`Deleting booking ${bookingId}`);
        const deletedBooking = await BookingModel.findByIdAndUpdate(bookingId, { isDeleted: true }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',
            data: deletedBooking
        });
    } catch (error) {
        console.error(`Error deleting booking ${bookingId}:`, error);
        next(error);
    }
};
 export const bookingController={
    deleteBooking,
    updateBooking,
    getAllBookings,
    getUserBookings,
    createBooking
 }
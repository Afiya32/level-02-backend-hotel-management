// booking controller

import { Request, Response, NextFunction } from 'express';
import BookingModel from './booking.model';
import { RoomModel } from '../roomsmodules/room.model';
import slotModel from '../slotmodules/slot.model';
import { Booking } from './booking.inerface';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, slots, room, user } = req.body;

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
        next(error);
    }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await BookingModel.find().populate('room').populate('slots').populate('user');
        res.status(200).json({
            success: true,
            message: 'All bookings retrieved successfully',
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

export const getUserBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user as any)._id;
        const bookings = await BookingModel.find({ user: userId }).populate('room').populate('slots').populate('user');
        res.status(200).json({
            success: true,
            message: 'User bookings retrieved successfully',
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = req.params.id;
        const updates = req.body;
        const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, updates, { new: true });
        res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        next(error);
    }
};

export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = req.params.id;
        const deletedBooking = await BookingModel.findByIdAndUpdate(bookingId, { isDeleted: true }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',
            data: deletedBooking
        });
    } catch (error) {
        next(error);
    }
};

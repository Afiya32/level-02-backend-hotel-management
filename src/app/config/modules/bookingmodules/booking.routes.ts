// booking routes


import { Router } from 'express';
import { createBooking, getAllBookings, getUserBookings, updateBooking, deleteBooking } from './booking.controller';
import authBookingMiddleware from '../../auth.booking.middleware';
import adminMiddleware from '../../admin.middleware';


const BookingRouter = Router();

// Create Booking (Only Accessible by Authenticated User)
BookingRouter.post('/bookings', authBookingMiddleware, createBooking);

// Get All Bookings (Only Accessible by Admin)
BookingRouter.get('/bookings', authBookingMiddleware, adminMiddleware, getAllBookings);

// Get User's Bookings (Only Accessible by Authenticated User)
BookingRouter.get('/my-bookings', authBookingMiddleware, getUserBookings);

// Update Booking (Only Accessible by Admin)
BookingRouter.put('/bookings/:id', authBookingMiddleware, adminMiddleware, updateBooking);

// Delete Booking (Soft Delete, Only Accessible by Admin)
BookingRouter.delete('/bookings/:id', authBookingMiddleware, adminMiddleware, deleteBooking);

export default BookingRouter;

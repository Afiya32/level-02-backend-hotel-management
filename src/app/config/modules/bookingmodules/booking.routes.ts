import { bookingController } from './booking.controller';
// booking routes


import { Router } from 'express';

import authBookingMiddleware from '../../auth.booking.middleware';
import adminMiddleware from '../../admin.middleware';


const BookingRouter = Router();

// Create Booking (Only Accessible by Authenticated User)
BookingRouter.post('/bookings', authBookingMiddleware, bookingController.createBooking);

// Get All Bookings (Only Accessible by Admin)
BookingRouter.get('/bookings', authBookingMiddleware, adminMiddleware, bookingController.getAllBookings);

// Get User's Bookings (Only Accessible by Authenticated User)
BookingRouter.get('/my-bookings', authBookingMiddleware, bookingController.getUserBookings);

// Update Booking (Only Accessible by Admin)
BookingRouter.put('/bookings/:id', authBookingMiddleware, adminMiddleware, bookingController.updateBooking);

// Delete Booking (Soft Delete, Only Accessible by Admin)
BookingRouter.delete('/bookings/:id', authBookingMiddleware, adminMiddleware, bookingController.deleteBooking);

export default BookingRouter;

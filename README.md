To implement the Meeting Room Booking System for co-working spaces based on the provided requirements, we need to structure the backend using TypeScript, Express.js, and Mongoose (for MongoDB). Let's break down the implementation step by step based on the defined models and routes.

Setup
Initialize a TypeScript project: Set up a new TypeScript project if you haven't already. Ensure you have TypeScript installed (npm install -g typescript) and a tsconfig.json configured.

Install necessary packages:

bash

npm install express mongoose body-parser jsonwebtoken bcrypt @types/express @types/mongoose @types/jsonwebtoken @types/bcrypt
Create necessary folders and files:

Create folders for models, routes, middlewares, etc., to organize your project.
Set up files like server.ts (main entry point), db.ts (MongoDB connection setup), auth.ts (authentication middleware), and individual files for models and routes.
Models
User Model (user.model.ts)
typescript

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export default model('User', userSchema);
Room Model (room.model.ts)
typescript

import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
  name: { type: String, required: true },
  roomNo: { type: Number, required: true, unique: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  isDeleted: { type: Boolean, default: false },
});

export default model('Room', roomSchema);
Slot Model (slot.model.ts)
typescript

import { Schema, model } from 'mongoose';

const slotSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

export default model('Slot', slotSchema);
Booking Model (booking.model.ts)
typescript

import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: 'Slot' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  isConfirmed: { type: String, enum: ['confirmed', 'unconfirmed', 'canceled'], default: 'unconfirmed' },
  isDeleted: { type: Boolean, default: false },
});

export default model('Booking', bookingSchema);
Routes
User Routes (user.routes.ts)
typescript

import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);

export default router;
Room Routes (room.routes.ts)
typescript

import { Router } from 'express';
import RoomController from '../controllers/room.controller';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.post('/rooms', authMiddleware, RoomController.createRoom);
router.get('/rooms', RoomController.getAllRooms);
router.get('/rooms/:id', RoomController.getRoom);
router.put('/rooms/:id', authMiddleware, RoomController.updateRoom);
router.delete('/rooms/:id', authMiddleware, RoomController.deleteRoom);

export default router;
Slot Routes (slot.routes.ts)
typescript

import { Router } from 'express';
import SlotController from '../controllers/slot.controller';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.post('/slots', authMiddleware, SlotController.createSlots);
router.get('/slots/availability', SlotController.getAvailableSlots);

export default router;
Booking Routes (booking.routes.ts)
typescript

import { Router } from 'express';
import BookingController from '../controllers/booking.controller';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.post('/bookings', authMiddleware, BookingController.createBooking);
router.get('/bookings', authMiddleware, BookingController.getAllBookings);

export default router;
Controllers (*.controller.ts)
Implement controllers for each route (user.controller.ts, room.controller.ts, slot.controller.ts, booking.controller.ts) to handle business logic and interact with the models.
Middleware (auth.ts)
Implement authentication middleware (auth.ts) to verify JWT tokens and protect routes that require authentication.
Server (server.ts)
Configure Express server (server.ts) to handle routes, middleware, error handling, etc.
Set up MongoDB connection (db.ts) and integrate it with Mongoose.
This structured approach ensures that your Meeting Room Booking System is well-organized, scalable, and maintains separation of concerns between different components of your backend application. Adjust routes and controllers as per your specific business logic and error handling requirements.

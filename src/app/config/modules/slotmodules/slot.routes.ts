// slot.routes.ts

import express from 'express';
import { createSlot, getAvailableSlots } from './slot.controller';

const SlotRouter = express.Router();

// Route for creating a slot
SlotRouter.post('/slots', createSlot);

// Route for getting available slots
SlotRouter.get('/slots/availability', getAvailableSlots);

export default SlotRouter;

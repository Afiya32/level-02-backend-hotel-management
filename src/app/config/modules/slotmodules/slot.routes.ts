// slot.routes.ts

import express from 'express';
import { slotController } from './slot.controller';


const SlotRouter = express.Router();

// Route for creating a slot
SlotRouter.post('/slots', slotController.createSlot);

// Route for getting available slots
SlotRouter.get('/slots/availability', slotController.getAvailableSlots);

export default SlotRouter;

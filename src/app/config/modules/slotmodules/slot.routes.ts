// slot.routes.ts

import express from 'express';
import { slotController } from './slot.controller';
import { authenticateAdmin } from '../../auth.middleware';


const SlotRouter = express.Router();

// Route for creating a slot
SlotRouter.post('/slots',authenticateAdmin, slotController.createSlot);

// Route for getting available slots
SlotRouter.get('/slots/availability', slotController.getAvailableSlots);

export default SlotRouter;

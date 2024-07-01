// slot.services.ts

import { Slot } from './slot.interface';
import SlotModel from './slot.model';


// creating slot services
 const createSlotDB = async (slotData: Slot): Promise<Slot> => {
    try {
        const createdSlot = await SlotModel.create(slotData);
        return createdSlot;
    } catch (error) {
        throw error;
    }
};

// getting slot services
const getAvailableSlotsDB = async (date?: string, roomId?: string): Promise<Slot[]> => {
    try {
        let query: any = {};
        if (date) {
            query.date = date;
        }
        if (roomId) {
            query.room = roomId;
        }

        const slots = await SlotModel.find(query).populate('room');
        return slots;
    } catch (error) {
        console.error('Database Query Error:', error);
        throw error;
    }
};


export const slotServices={
    getAvailableSlotsDB,createSlotDB
}

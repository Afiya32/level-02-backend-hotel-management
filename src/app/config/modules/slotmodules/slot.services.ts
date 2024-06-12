// slot.services.ts

import { Slot } from './slot.interface';
import SlotModel from './slot.model';

export const createSlotDB = async (slotData: Slot): Promise<Slot> => {
    try {
        const createdSlot = await SlotModel.create(slotData);
        return createdSlot;
    } catch (error) {
        throw error;
    }
};

export const getAvailableSlotsDB = async (date: string, roomId?: string): Promise<Slot[]> => {
    try {
        let query: any = { date };
        if (roomId) {
            query.room = roomId;
        }

        const slots = await SlotModel.find(query);
        return slots;
    } catch (error) {
        throw error;
    }
};

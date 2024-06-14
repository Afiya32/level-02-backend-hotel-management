// slot.controller.ts

import { Request, Response, NextFunction } from 'express';
import SlotModel from './slot.model';
import { Slot } from './slot.interface';

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}


// create slot for empty room
 const createSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { room, date, startTime, endTime } = req.body;

        
        const slotDuration = 60;
        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);
        const totalDuration = endMinutes - startMinutes;

        if (totalDuration % slotDuration !== 0) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Invalid slot duration',
                data: null
            });
        }

        const numberOfSlots = totalDuration / slotDuration;
        const slots = [];

        for (let i = 0; i < numberOfSlots; i++) {
            const start = minutesToTime(startMinutes + i * slotDuration);
            const end = minutesToTime(startMinutes + (i + 1) * slotDuration);
            const slotData: Omit<Slot, '_id'> = { // Omit _id field as it's auto-generated
                room,
                date,
                startTime: start,
                endTime: end,
                isBooked: false
            };

            const createdSlot = await SlotModel.create(slotData);
            slots.push(createdSlot);
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Slots created successfully',
            data: slots
        });
    } catch (error) {
        next(error);
    }
};
// booking empty slot 
 const getAvailableSlots = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, roomId } = req.query;

        let query: any = { date };
        if (roomId) {
            query.room = roomId;
        }

        const slots = await SlotModel.find(query).populate('room');

        if (!slots) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'No slots found',
                data: []
            });
        }

        const availableSlots = slots.filter(slot => !slot.isBooked);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Available slots retrieved successfully',
            data: availableSlots
        });
    } catch (error) {
        next(error);
    }
};
 export const slotController={
    createSlot,getAvailableSlots
 }
// slot.interface.ts

export interface Slot {
    _id: string;
    room: string; 
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}

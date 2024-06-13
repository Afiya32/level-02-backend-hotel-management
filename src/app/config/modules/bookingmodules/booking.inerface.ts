// booking interface


import { Document } from 'mongoose';
import { Room } from '../roomsmodules/room.interface';
import { Slot } from '../slotmodules/slot.interface';
import { Users } from '../usersmodules/user.interface';


export interface Booking extends Document {
    
    room: Room['_id'];
    slots: Slot['_id'][];
    user: Users['_id'];
    date: Date;
    totalAmount: number;
    isConfirmed: 'unconfirmed' | 'confirmed' | 'canceled';
    isDeleted: boolean;
}

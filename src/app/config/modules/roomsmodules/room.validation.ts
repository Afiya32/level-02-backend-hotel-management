// room validation

import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  roomNo: z.number().int().positive("Room number must be a positive integer"),
  floorNo: z.number().int().nonnegative("Floor number must be a non-negative integer"),
  capacity: z.number().int().positive("Capacity must be a positive integer"),
  pricePerSlot: z.number().positive("Price per slot must be a positive number"),
  amenities: z.array(z.string()).nonempty("Amenities must be a non-empty array of strings"),
  isDeleted: z.boolean().default(false),
});

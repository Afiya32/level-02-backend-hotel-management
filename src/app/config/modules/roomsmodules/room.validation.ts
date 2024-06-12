// room validation

import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().min(1, "Name is required"),
  roomNo: z.number().positive("Room number must be a positive number"),
  floorNo: z.number().positive("Floor number must be a positive number"),
  capacity: z.number().positive("Capacity must be a positive number"),
  pricePerSlot: z.number().positive("Price per slot must be a positive number"),
  amenities: z.array(z.string().min(1, "Amenity cannot be empty")),
  isDeleted: z.boolean().optional(),
});

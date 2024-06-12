// slot.validation.ts

import { z } from 'zod';

export const slotSchema = z.object({
    room: z.string().nonempty(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/)
});

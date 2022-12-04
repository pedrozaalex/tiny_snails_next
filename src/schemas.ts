import { z } from 'zod';

export const createSnailSchema = z.object({
    url: z.string().url(),
    alias: z.string().optional(),
});

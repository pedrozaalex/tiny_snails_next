import { z } from 'zod';

export const createSnailSchema = z.object({
    url: z.string().url(),
    alias: z.string().optional(),
});

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
});

export const loginSchema = signupSchema;

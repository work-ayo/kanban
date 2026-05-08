import { z } from 'zod';

export const registerBodySchema = z.object({
  loginId: z.string().min(3),
  password: z.string().min(8),
  name: z.string().min(1),
  department: z.string().optional(),
});

export const loginBodySchema = z.object({
  loginId: z.string().min(3),
  password: z.string().min(1),
});

export const refreshBodySchema = z.object({ refreshToken: z.string().min(1) });

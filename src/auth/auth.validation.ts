import { z } from 'zod';

export const registerValidate = z
  .object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(6),
  })
  .required();

export type RegisterType = z.infer<typeof registerValidate>;

/* --- */

export const loginValidate = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
  })
  .required();

export type LoginType = z.infer<typeof loginValidate>;

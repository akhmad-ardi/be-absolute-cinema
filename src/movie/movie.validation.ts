import { z } from 'zod';

export const saveMovieValidation = z
  .object({
    movie_id: z.number(),
    title: z.string().min(1),
    poster_url: z.string().min(1),
    user_id: z.number(),
  })
  .required();

export type SaveMovieType = z.infer<typeof saveMovieValidation>;

/* --- */

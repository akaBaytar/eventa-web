import { z } from 'zod';

export const eventFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters.')
    .max(500, 'Description must be less than 500 characters.'),
  location: z
    .string()
    .min(3, 'Location must be at least 3 characters.')
    .max(100, 'Location must be less than 100 characters.'),
  imageUrl: z.string(),
  categoryId: z.string(),
  price: z.string(),
  url: z.string().url(),
  isFree: z.boolean(),
  startDateTime: z.date(),
  endDateTime: z.date(),
});
